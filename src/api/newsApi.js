export function newsApi(http) {
    return {
      getPage: (pageNumber = 1) => {
        return http.get(`search?query=bar&page=${pageNumber - 1}`);
      },
  
      saveHiddenState: (newsId, hideState) => {
        return http.post(`/api/news/hide/${newsId}`, hideState);
      },

      updateVote: (newsId, votes) => {
          return http.post(`/api/news/votes/${newsId}`, votes);
      },

      // todo: get localstorage
      getHiddenState: (newsId) => {
        try {
          return localStorage.getItem(`/api/news/hide/${newsId}`);
        } catch(e) {
          return null;
        }
      },

      getVotes: (newsId) => {
        try {
          return localStorage.getItem(`/api/news/votes/${newsId}`);
        } catch(e) {
          return null;
        }
      } 
    };
  }
  