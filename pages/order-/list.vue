<template>
  <order :current="current"></order>
</template>

<script type="text/ecmascript-6">
  import order from '@/components/order/order.vue';
  export default {
    components: {
      order,
    },
    data() {
      return {
        current: 0
      };
    },
    onLoad(opt) {
      this.current = +opt.current;
      console.info("this.current",this.current);
    },
    created() {
    },
    methods: {
    },
    
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "@/common/scss/variable";

</style>
