const UserManager = {
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentClient'));
    },
  
    updateUserData(updatedData) {
      const allUsers = JSON.parse(localStorage.getItem('clients')) || [];
      const currentUser = this.getCurrentUser();
      
      const updatedUsers = allUsers.map(user => {
        if (user.username === currentUser.username) {
          return { ...user, ...updatedData };
        }
        return user;
      });
      
      localStorage.setItem('clients', JSON.stringify(updatedUsers));
      localStorage.setItem('currentClient', JSON.stringify({
        ...currentUser,
        ...updatedData
      }));
    },
  
    addToCart(item) {
      const currentUser = this.getCurrentUser();
      const newCart = [...currentUser.panier, item];
      this.updateUserData({ panier: newCart });
    },
  
    addInterest(item) {
      const currentUser = this.getCurrentUser();
      const newInterests = [...currentUser.interets, item];
      this.updateUserData({ interets: newInterests });
    }
  };