import React, { memo, useReducer, useEffect } from 'react';
import { Promise } from 'bluebird';
import Elections from '../presentational/Content/Elections';
import { getBlockNumber } from '../data/fetch/eth';
import {
  getCurrentValidatorSigners,
  getGroupVoteStatus,
} from '../data/fetch/election';
import { getValidator, getValidatorGroup } from '../data/fetch/validators';
import {
  validatorSignerToAccount,
  getAccountSummary,
} from '../data/fetch/accounts';
import { GetValidatorResponse } from '../types/election';

const types = {
  INIT: 'INIT',
  GET_ELECTED_VALIDATORS: 'GET_ELECTED_VALIDATORS',
  GET_ELECTED_GROUPS: 'GET_ELECTED_GROUPS',
};

const initialState = {
  epoch: 0,
  block: 0,
  votes: 0,
  earnings: 0,
  score: 0,
  electedValidators: {},
  electedValidatorIds: [],
  electedGroups: {},
  electedGroupIds: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.INIT:
      return {
        ...state,
        epoch: Math.ceil(payload / 720),
        block: payload,
      };
    case types.GET_ELECTED_VALIDATORS: {
      const { address, ...remainingValidator } = payload.validator;

      return {
        ...state,
        electedValidators: {
          ...state.electedValidators,
          [address]: {
            ...remainingValidator,
          },
        },
        electedValidatorIds: [...state.electedValidatorIds, address],
      };
    }
    case types.GET_ELECTED_GROUPS: {
      const { address, ...remainingGroup } = payload.group;

      return {
        ...state,
        electedGroups: {
          ...state.electedGroups,
          [address]: {
            ...remainingGroup,
          },
        },
        electedGroupIds: [...state.electedGroupIds, address],
        votes: state.votes + remainingGroup.votes,
      };
    }
    default:
      return;
  }
};

const ElectionsContainer = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInitialState = async () => {
    // TODO: Subscribe to new block header events
    dispatch({
      type: types.INIT,
      payload: (await getBlockNumber()).number,
    });
  };

  const getElectedValidators = async () => {
    try {
      const signers = (await getCurrentValidatorSigners(state.block)).addresses;

      await Promise.each(signers, async (signer) => {
        const validatorAddress = (await validatorSignerToAccount(state.block, signer))
          .address;
        const validator: GetValidatorResponse = await getValidator(
          state.block, 
          validatorAddress,
        );
        const validatorSummary = await getAccountSummary(state.block, validatorAddress);

        if (!state.electedGroupIds.includes(validator.groupAddress)) {
          const validatorGroup = await getValidatorGroup(
            state.block, 
            validator.groupAddress,
          );
          const groupVoteStatus = await getGroupVoteStatus(
            state.block,
            validator.groupAddress,
          );
          const group = {
            ...validatorGroup,
            ...groupVoteStatus,
          }

          dispatch({
            type: types.GET_ELECTED_GROUPS,
            payload: {
              group,
            },
          });
        }

        return dispatch({
          type: types.GET_ELECTED_VALIDATORS,
          payload: {
            validator: {
              address: validatorAddress,
              ...validator,
              ...validatorSummary,
            },
          },
        });
      });
    } catch (err) {
      console.error(err);
      throw err;
    }

    // return (await Promise.reduce(signers, async (acc, signer) =>{
    //   const validator = await validatorSignerToAccount(signer);
    // }, {}))
  };

  useEffect(() => {
    if (!state.block) {
      setInitialState();
    } else if (
      state.block &&
      !state.electedValidatorIds.length &&
      !state.electedGroupIds.length
    ) {
      getElectedValidators();
    }

    return;
  }, [state.block, state.electedValidatorIds]);

  return (
    <Elections
      epoch={state.epoch}
      block={state.block}
      electionSummary={{
        votes: state.votes,
        earnings: state.earnings,
        score: state.score,
      }}
      electedValidators={{
        byId: state.electedValidators,
        allIds: state.electedValidatorIds,
      }}
      electedGroups={{
        byId: state.electedGroups,
        allIds: state.electedGroupIds,
      }}
    />
  );
});

export default ElectionsContainer;
