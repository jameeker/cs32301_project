// For client ID generation so everyone's individual browser session of our web app is unique to them
export const getClientId = () => {
    let clientId = localStorage.getItem('bulletin_board_client_id');
    
    if (!clientId) {
      // Generate a random ID if none exist
      clientId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('bulletin_board_client_id', clientId);
    }
    
    return clientId;
  };