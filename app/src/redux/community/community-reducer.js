import CommunityTypes from "./community-types";

const CommunityInitialState = {
  nearPeopleLoading: false,
  nearPeopleLoadingError: null,
  nearPeopleData: null,
  loadingProfile: false,
  profileError: null,
  profile: null,
  chatsLoading: false,
  chatsError: null,
  chats: null,
  openChatLoading: false,
  openChatError: null,
  openChatData: null,
};

const CommunityReducer = (state = CommunityInitialState, action) => {
  switch (action.type) {
    case CommunityTypes.FETCH_NEAR_PEOPLE: {
      return {
        ...state,
        nearPeopleLoading: true,
        nearPeopleLoadingError: null,
        nearPeopleData: null,
      };
    }
    case CommunityTypes.FETCH_NEAR_PEOPLE_ERROR: {
      return {
        ...state,
        nearPeopleLoading: false,
        nearPeopleLoadingError: action.payload,
        nearPeopleData: null,
      };
    }
    case CommunityTypes.FETCH_NEAR_PEOPLE_SUCCESS: {
      return {
        ...state,
        nearPeopleLoading: false,
        nearPeopleLoadingError: null,
        nearPeopleData: action.payload
      };
    }
    case CommunityTypes.GET_PROFILE_REQUEST: {
      return {
        ...state,
        loadingProfile: true,
        profileError: null,
      };
    }
    case CommunityTypes.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        loadingProfile: false,
        profileError: null,
        profile: action.payload,
      }
    }
    case CommunityTypes.GET_PROFILE_ERROR: {
      return {
        ...state,
        loadingProfile: false,
        profileError: action.payload,
      };
    }
    case CommunityTypes.GET_CHATS_REQUEST: {
      return {
        ...state,
        chats: null,
        chatsLoading: true,
        chatsError: null
      };
    }
    case CommunityTypes.GET_CHATS_SUCCESS: {
      return {
        ...state,
        chatsLoading: false,
        chats: action.payload,
        chatsError: null
      };
    }
    case CommunityTypes.GET_CHATS_ERROR: {
      return {
        ...state,
        chatsLoading: false,
        chats: null,
        chatsError: action.payload,
      };
    }
    case CommunityTypes.OPEN_CHAT_ROOM_REQUEST: {
      return {
        ...state,
        openChatLoading: true,
        openChatError: null,
        openChatData: null,
      };
    }
    case CommunityTypes.OPEN_CHAT_ROOM_SUCCESS: {
      return {
        ...state,
        openChatLoading: false,
        openChatError: null,
        openChatData: action.payload
      };
    }
    case CommunityTypes.OPEN_CHAT_ROOM_ERROR: {
      return {
        ...state,
        openChatLoading: false,
        openChatError: action.payload,
        openChatData: null
      };
    }
    default: {
      return state;
    }
  }
}

export default CommunityReducer;
