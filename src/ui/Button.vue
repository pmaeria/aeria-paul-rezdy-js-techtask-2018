<!-- Mock example of a reusable, generic button -->
<template>
    <button @click="$emit('click')" class="button">
        <!-- maximum flexibility of what a button can display by using slots -->
        <slot></slot>
    </button>
</template>

<script>

export default {
  name: 'ui-button',
  props: {
    
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .button {
        background-color: #519872;
        padding: 10px;
        color: #FFFFFF;
        border: 0;
        font-size: 14px;
        cursor: pointer;
    }
</style>
