import React, { memo, useReducer, useEffect } from 'react';
import Elections from '../presentational/Content/Elections';
import { getBlockNumber, initialState as ethInitialState } from '../data/fetch/eth';

const initialState = {
  ...ethInitialState,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_BLOCK_NUMBER':
      return {
        ...state,
        epoch: Math.ceil(payload / 720),
        block: payload,
      };
    default:
      return;
  }
}

const ElectionsContainer = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const setInitialState = async () => {
    // TODO: Subscribe to new block header events
    dispatch({
      type: 'GET_BLOCK_NUMBER',
      payload: (await getBlockNumber()).data.number,
    })
  };

  useEffect(() => {
    if (!state.block) {
      setInitialState()
    }

    return;
  }, [state.block])

  return (
    <Elections
      currentEpochNumber={state.epoch}
      currentBlockNumber={state.block}
      electionSummary={{
        totalVotes: '0',
        totalFeesEarned: '0',
        totalMissedSignatures: 0,
      }}
      electionValidators={{
        yolo: {
          groupName: '',
          address: '',
          votes: '',
          name: '',
          feesEarned: '',
          blockSignaturePercentage: 0,
        },
      }}
    />
  );
});

export default ElectionsContainer;
