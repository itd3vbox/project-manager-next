import { 
  SpaceState, SpaceAction, 
  SIGN_IN, SIGN_OUT 
} from '@/lib/actions/space/spaceActions'

const initialState: SpaceState = {
  isSigned: false,
  user: {},
};

const spaceReducer = (state: SpaceState = initialState, action: SpaceAction): SpaceState => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSigned: true,
        user: action.payload.user,
      }
    case SIGN_OUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default spaceReducer
