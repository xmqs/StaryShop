<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="Bread">Goods</span>
      <span slot="Bread2">Goods2</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop " id="filter" v-bind:class="{'filterBy-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)"@click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
              <dd v-for="(price,index) in priceFilter" >
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">Buy</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                <img src="./../../../static/loading-svg/loading-spinning-bubbles.svg" alt="" v-if="loadding">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow">
      <p slot="message">请先登录否者无法加入到购物车中</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShow=false">确定</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShow">
      <p slot="message">请先登录否者无法加入到购物车中</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShow=false">确定</a>
      </div>
    </modal>
    <div class="md-overlay" v-if="mdShow" @click="mdShow=false"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import '../../assets/css/product.css'
  import '../../assets/css/base.css'

  import NavHeader from "@/components/Views/NavHeader"
  import NavBread from "@/components/Views/NavBread"
  import NavFooter from "@/components/Views/NavFooter"
  import Modal from "@/components/Modal"

  import axios from "axios"

    export default {
      name: "GoodList",
      components:{
        NavHeader,NavBread,NavFooter,Modal
      },
      data(){
        return{
          msg:"123",
          goodsList:[],
          priceChecked:'all',
          filterBy:false,
          overLayFlag:false,
          sortFlag:true,
          priceFilter:[
            {
              startPrice:'0.00',
              endPrice:'500.00',
            },
            {
              startPrice:'500.00',
              endPrice:'1000.00'
            },
            {
              startPrice:'1000.00',
              endPrice:'5000.00'
            }
          ],
          page:1,
          pageSize:8,
          busy:true,
          loadOver:true,
          loadding:false,
          mdShow:false
        }
      },
      mounted() {
        this.getGoodList(false);
      },
      methods:{
        //获取商品
        getGoodList(flag){
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
          }
          this.loadding = true;
          axios.get('/goods/list',{params:param}).then((resposne)=>{
            this.loadding = false;
            if (resposne.status == "200"){
              if(flag){
                this.goodsList = this.goodsList.concat(resposne.data.result.list);
                console.log(resposne.data.result.count);
                if (resposne.data.result.count == 0) {
                  this.busy = true;
                } else {
                  this.busy = false;
                }
              } else {
                this.goodsList = resposne.data.result.list;
                this.busy = false;
              }
            }else {
              this.goodsList = {};
              this.busy = true;
            }

          })
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodList();
        },
        showFilter(){
            this.filterBy = true;
            this.overLayFlag = true;
        },
        loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodList(true);
            this.busy = false;
          }, 1000);
        },
        setPriceFilter(index){
          this.priceChecked = index;
          this.page = 1;
          this.getGoodList();
        },
        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
            if(res.data.status == 0){
              alert("suc")
            }else{
              this.mdShow = true;
            }
          })
        },
      }
    }
</script>
