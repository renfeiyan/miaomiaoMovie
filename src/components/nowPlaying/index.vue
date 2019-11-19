<template>
<div id="content">
    <div class="movie_body" ref="movie_body">
        <Scroller :handlerToScroll="handlerToScroll" :handlerToTouchEnd="handlerToTouchEnd">
            <ul>
            <li class="oLi" v-if="pullMsg">{{pullMsg}}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{item.nm}}</h2><img v-if="item.version" src="@/assets/maxs.png" />
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</div>
</template>

<script>
/* 注意tag事件he click事件区别，后者有延迟*/
// import BScroll from 'better-scroll'   //很好用的一个滑动，使用条件：外层盒子小于内层盒子滑动才起作用！！！  

export default {
    name: 'nowPlaying',
    data() {
        return {
            movieList:[],
            pullMsg: '',
            preCityId: -1
        }
    },
    activated() {  //此生命周期就是可以有keep-alive时转入会重新调用
        var cityId = this.$store.state.city.id;
        if (this.preCityId === cityId) {return;}
        else {
            this.$axios.get('/api/movieOnInfoList?cityId='+cityId).then(res => {
                var msg = res.data.msg;
                if(msg === 'ok'){
                    this.movieList = res.data.data.movieList;
                    this.preCityId = cityId;
                    // this.$nextTick(() => {  //vue 自带，等页面渲染完数据后才调用此回调
                    //     var scroll =  new BScroll(this.$refs.movie_body, {
                    //         //配置项
                    //         tap: true,
                    //         probeType: 1 //节流之类的？？
                    //     });  //
                    //     scroll.on('scroll', (pos) => {  //滑动时触发
                    //         if( pos.y > 30){  //向下拖拽超过30触发
                    //             this.pullMsg = '正在加载'
                    //         }
                            
                    //     })
                    //     scroll.on('touchEnd',(pos) => { //滑动结束时触发
                    //         if( pos.y > 30){
                    //             this.$axios.get('/api/movieOnInfoList?cityId=11').then(res => {
                    //                 var msg = res.data.msg;
                    //                 if(msg === 'ok'){
                    //                     this.pullMsg = '加载完成',
                    //                     setTimeout(() =>{
                    //                         this.movieList = res.data.data.movieList;
                    //                         this.pullMsg = '';
                    //                     }, 1000)
                                        
                    //                 }
                    //             })

                    //         }
                    //     })
                    // })
                }
            })
        }
    },
    methods: {
        handleToDetail(MovieId) {
            // console.log(MovieId)
            this.$router.push('/movie/detail/1/'+ MovieId)
        },
        handlerToScroll(pos) {
            if( pos.y > 30){  //向下拖拽超过30触发
                this.pullMsg = '正在加载'
            }
        },
        handlerToTouchEnd(pos) {
            if( pos.y > 30){
                this.$axios.get('/api/movieOnInfoList?cityId='+cityId).then(res => {
                    var msg = res.data.msg;
                    if(msg === 'ok'){
                        this.pullMsg = '加载完成',
                        setTimeout(() =>{
                            this.movieList = res.data.data.movieList;
                            this.pullMsg = '';
                        }, 1000)
                        
                    }
                })
            }
        }
    }
    
}
</script>
    
<style scoped>
.oLi { margin: 0 40%}
#content .movie_body{ flex:1; overflow:auto;height:800px;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>