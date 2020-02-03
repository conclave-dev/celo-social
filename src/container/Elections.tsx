import React, { Suspense, memo, useReducer, useEffect } from 'react';
import { reduce } from 'lodash';
import Elections from '../presentational/Content/Elections';
import { getBlockNumber } from '../data/fetch/eth';
import {
  getElectedValidatorsOverview,
  getValidatorGroupsOverviewByAccounts,
} from '../data/fetch/validators';

const types = {
  INIT: 'INIT',
  GET_ELECTED: 'GET_ELECTED',
};

const initialState = {
  epoch: 0,
  block: 0,
  votes: 0,
  earnings: 0,
  uptime: 0,
  electedValidators: [],
  electedGroups: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.INIT:
      return {
        ...state,
        epoch: Math.ceil(payload / 720),
        block: payload,
      };
    case types.GET_ELECTED:
      return {
        ...state,
        electedValidators: payload.validators,
        electedGroups: payload.groups,
        votes: payload.votes,
      };
    default:
      return;
  }
};

const ElectionsContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInitialState = async () => (
    // TODO: Subscribe to new block header events
    dispatch({
      type: types.INIT,
      payload: (await getBlockNumber()).number,
    })
  );

  const getElected = async () => {
    try {
      const { validators } = await getElectedValidatorsOverview(state.block);
      const groupAddresses = validators.map(({ groupAddress }) => groupAddress);
      const { validatorGroups } = await getValidatorGroupsOverviewByAccounts(
        state.block,
        groupAddresses,
      );
      const { votes, groups } = reduce(
        validatorGroups,
        (total, validatorGroup) => ({
          votes: total.votes + validatorGroup.votes,
          groups: {
            ...total.groups,
            [validatorGroup.address]: validatorGroup,
          },
        }),
        { votes: 0, groups: {} },
      );

      return dispatch({
        type: types.GET_ELECTED,
        payload: {
          validators,
          groups,
          votes,
        },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    if (!state.block) {
      setInitialState();
    } else if (state.block && !state.electedValidators.length) {
      getElected();
    }

    return;
  }, [state.block, state.electedValidators]);

  const electionSummary = {
    votes: state.votes,
    earnings: state.earnings,
    uptime: state.uptime,
  };

  return (
    <Elections
      epoch={state.epoch}
      block={state.block}
      electionSummary={electionSummary}
      electedValidators={state.electedValidators}
      electedGroups={state.electedGroups}
    />
  );
};

export default memo(ElectionsContainer);
