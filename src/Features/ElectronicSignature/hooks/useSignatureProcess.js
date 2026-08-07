import { useReducer } from "react";

const initialState = {
  signers: [],
  selectedSigner: null,
  isPlacingSignature: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_SIGNER":
      return {
        ...state,
        signers: [...state.signers, action.payload],
        selectedSigner: action.payload.id,
        isPlacingSignature: true,
      };

    case "SET_SIGNERS":
      return {
        ...state,
        signers: action.payload,
        selectedSigner: null,
        isPlacingSignature: false,
      };

    case "UPDATE_SIGNER":
      return {
        ...state,
        signers: state.signers.map((s) =>
          s.id === action.payload.id ? { ...s, ...action.payload.data } : s,
        ),
      };

    case "REMOVE_SIGNER":
      return {
        ...state,
        signers: state.signers.filter((s) => s.id !== action.payload),
      };

    case "SELECT_SIGNER":
      return {
        ...state,
        selectedSigner: action.payload,
      };

    case "SET_PLACING":
      return {
        ...state,
        isPlacingSignature: action.payload,
      };

    default:
      return state;
  }
}

export default function useSignatureProcess(initialSigners = []) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    signers: initialSigners,
  });

  return {
    ...state,

    addSigner: (signer) =>
      dispatch({
        type: "ADD_SIGNER",
        payload: signer,
      }),

    setSigners: (signers) =>
      dispatch({
        type: "SET_SIGNERS",
        payload: signers,
      }),

    updateSigner: (id, data) =>
      dispatch({
        type: "UPDATE_SIGNER",
        payload: { id, data },
      }),

    removeSigner: (id) =>
      dispatch({
        type: "REMOVE_SIGNER",
        payload: id,
      }),

    setSelectedSigner: (id) =>
      dispatch({
        type: "SELECT_SIGNER",
        payload: id,
      }),

    setIsPlacingSignature: (value) =>
      dispatch({
        type: "SET_PLACING",
        payload: value,
      }),
  };
}
