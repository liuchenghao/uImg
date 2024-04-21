<template>
  <div class="destination-page">
    <div class="search-bar-wrapper">
      <search-bar ref="searchBar" :curCity="curCity" @search="search" @chooseCity="chooseCity" @cancel="goBack">
      </search-bar>
    </div>
    <div class="addressList-wrapper">
      <address-list :data="addresses" @choose="choosePlace"></address-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AddressList from '../../components/addressList.vue';
  import SearchBar from '../../components/search-bar.vue';
  import {
    mapMutations,
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        addresses: []
      };
    },
    onShow() {
      this.getSuggestion('a');
    },
    onUnload() {
      this.clearData();
    },
    methods: {
      search(value) {
        if (value.length === 0) {
          this.addresses = [];
          return;
        }
        this.getSuggestion(value);
      },
      chooseCity() {
        uni.navigateTo({
          url: '/pages/passenger/city',
          success: () => {
            this.clearData();
          }
        });
      },
      getSuggestion(value) {
        this.$map.getSuggestion({
          keyword: value,
          region: this.curCity,
          success: (res) => {
            console.info(res , "+_+_+_+_+");
            this.addresses = res.data;
          }
        });
      },
      goBack() {
        uni.navigateBack();
      },
      choosePlace(item) {
        //item.address详细地址
        //item.title简短语义化地址
        console.log(item);
        this.$map.geocoder({
          address: item.address,
          success: (res) => {
            this.saveEndPosition([res.result.location.lat, res.result.location.lng]);
            this.saveDestination(item.title);
            this.goBack();
          },
          fail: (err) => {
            console.log(err);
          }
        });
      },
      clearData() {
        this.$refs.searchBar.clear();
        this.addresses = [];
      },
      ...mapMutations("passenger/index", {
        saveDestination: 'SET_DESTINATION',
        saveEndPosition: 'SET_END_POSITION'
      })
    },
    computed: {
      ...mapState("passenger/index", [
        'curCity'
      ])
    },
    components: {
      SearchBar,
      AddressList
    }
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/mixin1';
  @import '../../common/less/variable';

  .destination-page {
    width: 100%;
    height: 100vh;

    .search-bar-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 44px;
      width: 100%;
      z-index: 999;
    }

    .addressList-wrapper {
      position: absolute;
      top: 45px;
      left: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
    }
  }
</style>
