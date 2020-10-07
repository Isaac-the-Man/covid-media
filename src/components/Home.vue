<template>
  <div>
    <transition name="fade">
      <div v-if="!isStart" class="text-center">
        <p>
          Covid-19, better known as the Coronavirus, has brought chaos to wherever it came across. To stop the spreading
          virus, various media reported stats and related facts to audience around the world. Please take this 3-minute
          survey to help better understand the effect of media on the public understanding of covid-19.
        </p>
        <b-button @click="start" pill class="shadow" variant="primary">Start</b-button>
      </div>
      <Questions v-else></Questions>
    </transition>
  </div>
</template>

<script>
import Questions from "@/components/Questions";

export default {
  name: "Home",
  components: {
    Questions
  },
  data() {
    return {
      isStart: false
    }
  },
  methods: {
    start() {
      this.isStart = true;
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
  transition-delay: 1s;
}
.fade-enter {
  opacity: 0;
}

</style>