<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" @click="updateOne(cartInfo)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum(cartInfo,-1,true)">-</a>
            <input autocomplete="off" type="text" 
              :value="cartInfo.skuNum" minnum="1" class="itxt"
              @change="changeNum(cartInfo,$event.target.value,false)"
            >
            <a href="javascript:void(0)" class="plus" @click="changeNum(cartInfo,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.cartPrice * cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cartInfo)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll" >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{shopNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMonay}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'ShopCart',
    mounted(){
      this.getShopCartList()
    },
    methods:{
      getShopCartList(){
        this.$store.dispatch('getShopCartList')
      },
      // 购物车改变数量回调函数
      // 因为接口需要穿id和改变的数量，所有需要计算改变的数量
      async changeNum(cartInfo,disNum,flag){
        
        if(!flag){
          // 用户输入的数量转换成改变的数量
          if(disNum > 0){
            disNum = disNum - cartInfo.skuNum
          }else{
            disNum = 1 - cartInfo.skuNum
          }
        }else{
          // 限定按钮数值， -1   +   1   0      1  - -1
          if(disNum + cartInfo.skuNum <= 0){
            disNum = 1 - cartInfo.skuNum
          }
        }

        // 发送更新购物车请求
        try {
          await this.$store.dispatch('addOrUpdateCart',{skuId:cartInfo.skuId, skuNum:disNum})
          this.getShopCartList()
          alert('修改商品成功')
          //重新获取购物车列表
        } catch (error) {
          alert(error.message)
        }
        
      },
      // 修改购物车单个选中状态
      async updateOne(cartInfo){
        try {
          await this.$store.dispatch('updateCartChecked',{skuID:cartInfo.skuId, isChecked:cartInfo.isChecked?0:1})
          alert('状态切换成功！')
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      },

      // 删除单个商品
      async deleteOne(cartInfo){
        try {
          this.$store.dispatch('deteleCart',cartInfo.skuId)
          alert('删除成功')
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      },

      // 删除选中的商品
      async deleteAll(){
        try {
          await this.$store.dispatch('deleteCartAll')
          alert('删除选中成功')
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      }
    },

    computed:{
      ...mapState({
        cartInfoList: state => state.shopcart.shopCartList
      }),
      // ...mapGetters(['cartInfoList']),
      // 计算全部商品数量
      shopNum(){
        return this.cartInfoList.reduce((prev,item)=>{
          if(item.isChecked){
            prev += item.skuNum
          }
          return prev
        },0)
      },
      // 计算全部金额
      allMonay(){
        return this.cartInfoList.reduce((prev, item)=>{
          if(item.isChecked){
            prev += item.cartPrice * item.skuNum
          }
          return prev
        },0)
      },
      // 计算是否全选
      isCheckedAll:{
        get(){
          return this.cartInfoList.every(item => item.isChecked)
        },
        async set(val){
          try {
            const result = await this.$store.dispatch('updateCartCheckedAll',val ? 1 : 0)
            // alert('全部更新状态成功')
            this.getShopCartList()
            // console.log(result);
          } catch (error) {
            alert(error.message)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>