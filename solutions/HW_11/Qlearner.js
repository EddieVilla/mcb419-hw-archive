class Qlearner {

  bestAction(state) {
    // return the best action for this state
    let bestQ = this.maxQ(state);
    for (let i=0; i<this.Q[state].length; i++) {
      if (this.Q[state][i] == bestQ) return i;
    }
  }

  maxQ(state) {
    // return the maximum Q value for this state
    return max(this.Q[state]);
  }

  updateQ(state, action, reward, nextState) {
    // implement the Q-learning update rule
    // state, action, reward, and nextState are passed in as arguments
    this.Q[state][action] += 
      this.alpha * (reward + this.gamma*this.maxQ(nextState) - this.Q[state][action]);
  }
  
  //===================================
  // NOTHING BELOW HERE SHOULD CHANGE
  //===================================


  constructor(nstates, nactions) {
    this.nstates = nstates;
    this.nactions = nactions;

    // create array Q[nstates][nactions]
    this.Q = new Array(nstates);
    for (let i = 0; i < nstates; i++) {
      this.Q[i] = new Array(nactions);
    }

    this.resetQ(); // randomize Q values

    this.gamma = 0.8; // discount factor
    this.epsilon = 0.1; // initial epsilon for epsilon-greedy policy
    this.alpha = 0.01; // learning rate
  }

  resetQ() {
    // reinitialize Q with random weights
    for (let i = 0; i < this.nstates; i++) {
      for (let j = 0; j < this.nactions; j++) {
        this.Q[i][j] = random(-0.001, 0.001); // random init
      }
    }
  }

  actionEpsGreedy(state) {
    // epsilon-greedy policy 
    if (random() < this.epsilon) {
      // pick a random action
      return randint(0, this.nactions - 1);
    } else {
      return this.bestAction(state);
    }
  }
}