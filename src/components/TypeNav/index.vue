<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">        
            <div @mouseleave="hideFirst" @mouseenter="showFirst">
                <h2 class="all">全部商品分类</h2>
                <transition name="slide">
                    <div class="sort" v-show="isShowFirst">
                        <div class="all-sort-list2" @click="toSearch">
                            <div class="item" 
                                v-for="(c1, index) in categoryList" 
                                :key="c1.categoryId"
                                @mouseenter="showSubList(index)"
                                :class="{active : currentIndex === index}"
                            >
                                <h3>
                                    <a href="##" 
                                        :data-categoryName="c1.categoryName" 
                                        :data-category1Id="c1.categoryId"
                                    >{{c1.categoryName}}</a>
                                    <!-- <router-link 
                                        :to="`/search?categoryName=${c1.categoryName}&&categoryId1=${c1.categoryId}`"
                                    >{{c1.categoryName}}</router-link> -->
                                    <!-- <a href="##" 
                                        @click="$router.push(`/search?categoryName=${c1.categoryName}&&categoryId1=${c1.categoryId}`)"
                                    >{{c1.categoryName}}</a> -->
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore" >
                                            <dt>
                                                <a href="##" 
                                                    :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId"
                                                >{{c2.categoryName}}</a>
                                                <!-- <router-link 
                                                    :to="`/search?categoryName=${c2.categoryName}&&categoryId2=${c2.categoryId}`"
                                                >{{c2.categoryName}}</router-link> -->
                                                <!-- <a href="##" 
                                                    @click="$router.push(`/search?categoryName=${c2.categoryName}&&categoryId2=${c2.categoryId}`)"
                                                >{{c2.categoryName}}</a> -->
                                            </dt>
                                            <dd >
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a href="##"
                                                        :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId"
                                                    >{{c3.categoryName}}</a>
                                                    <!-- <router-link 
                                                        :to="`/search?categoryName=${c3.categoryName}&&categoryId3=${c3.categoryId}`"
                                                    >{{c3.categoryName}}</router-link> -->
                                                    <!-- <a href="##" 
                                                        @click="$router.push(`/search?categoryName=${c3.categoryName}&&categoryId3=${c3.categoryId}`)"
                                                    >{{c3.categoryName}}</a> -->
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import _ from 'lodash'      //lodash完整引入，太大了
import throttle from 'lodash/throttle'

export default {
    name: 'TypeNav',
    /* mounted(){
        console.log(this.$store.state.home.categoryList);
    }, */
    data(){
        const path = this.$route.path
        return {
            // 设计一个选中的索引值
            // 未进入为-2，进入div为-1，选中列表为0++
            currentIndex: -2, 

            isShowFirst: path === '/'
        }
    },
    computed:{
        /* categoryList(){
            return this.$store.state.home.categoryList
            // console.log(result);
        } */
        // ...mapState('categoryList')
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    },
    /* created(){
        const path = this.$route.path
        if(path === '/'){
            this.isShowFirst = true
        }
    }, */
    methods:{

        // 显示导航栏
        showFirst(){
            // 鼠标移入div
            this.currentIndex = -1
            // 显示导航栏
            this.isShowFirst = true
        },

        // 隐藏导航栏
        hideFirst(){
            // 鼠标移出div
            this.currentIndex = -2
            // 隐藏导航栏
            const path = this.$route.path
            if(path !== '/'){
                this.isShowFirst = false
            }
        },


        // 显示导航栏子列表
        // 原始写法，函数触发次数太多
        /* showSubList(index){
            this.currentIndex = index
        }, */

        // 使用lodash函数节流
        /* showSubList: _.throttle(function(index){
            console.log('thorttle',index);
            this.currentIndex = index
        },100), */

        // 使用lodash函数节流（按需引入）
        showSubList: throttle(function(index){
            // console.log('thorttle',index);
            if(this.currentIndex !== -2){
                this.currentIndex = index
            }
        },500),

        // 携带参数，跳转搜索页
        toSearch(event){
            const target = event.target
            // console.dir(target);
            const {categoryname,category1id,category2id,category3id} = target.dataset
            if(categoryname){
                const query = {
                    categoryName:categoryname
                }
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else if(category3id){
                    query.category3Id = category3id
                }
                // 第一种写法
                // this.$router.push({path:'/search', query})
                // 第二种写法
                const location = {
                    name:'search',
                    query,
                    // 携带当前已有的params参数
                    params: this.$route.params
                }

                /* 
                其他也跳转search用push
                search跳转search用replace
                */
                if(this.$route.name === 'search'){
                    this.$router.replace(location)
                }else {
                    this.$router.push(location)
                }

                // 点击跳转,隐藏导航栏
                this.hideFirst()
                }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

        &.slide-enter-active, &.slide-leave-active {
            transition: all, .5s;
        }

        &.slide-enter, &slide-leave-to {
            height: 0;
            opacity: 0;
        }

       /*  &.slide-enter, &slide-leave-to {
            height: 0;
            opacity: 0;
        } */

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &.active {
                        background-color: #eee;
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>
