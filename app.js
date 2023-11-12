var app = new Vue({
  el: '#app',
  
  data: {
    tempo: 100,
    run: false,
    flash: false,
    taps: [],
  },
  
  computed: {
    tappedTempo() {
      if ( this.taps.length < 2 ) {
        return null;
      }
      const [sum, weightSum] = this.weights.reduce((acc, w, i) => {
        acc[0] = acc[0] + nums[i] * w;
        acc[1] = acc[1] + w;
        return acc;
      },
      [0, 0]
  );
  return sum / weightSum
      return 0;
    },
    
    weights() {
      if ( this.taps.length < 2 ) {
        return [];
      }
      
      return this.taps.map((_, index) => 0.8 ** index);
    }
  },
  
  methods: {
    go() {
      this.run = !this.run;
      if ( this.run ) {
        this.beat();
      } 
    },
    
    beat() {
      if ( !this.run ) return;
      this.flash = true;
      setTimeout(() => this.flash = false, 50);
      setTimeout(this.beat, 60000 / Number(this.tempo));
    },
    
    tap() {
      const tap = new Date;
      this.taps.push(tap);
      
      // remove tap after 5 seconds
      setTimeout(() => this.taps.shift(), 5000);
      
      if ( this.taps.length <= 1 ) {
        return;
      }
      
      // set tempo by averaging taps
      const ms = (tap - this.taps[0]) / (this.taps.length - 1);
      this.tempo = Math.round(60000 / ms);

      // start the metronome if not already running
      if ( !this.run ) {
        this.go();
      }
    },
  },
});
