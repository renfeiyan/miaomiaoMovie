<template>
<div class="content">
    <div class="city_body">
        <div class="city_list">
    
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hotList" :key="item.id" @click="handleToCity(item.nm,item.id)">{{item.nm}}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="item in cityList" :key="item.index">
                    <h2>{{item.index}}</h2>
                    <ul>
                        <li v-for="itemList in item.list" :key="itemList.id" @click="handleToCity(itemList.nm,itemList.id)">{{ itemList.nm }}</li>
                    </ul>
                </div>
            </div>
            <div class="city_index">
                <ul>
                    <li v-for="(item,index) in cityList" :key="item.index" 
                    @touchstart="handleToIndex(index)">{{item.index}}</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'City',
    data() {
        return {
            cityList:[],
            hotList:[]
        }
    },
    mounted() {
        var cityList = window.localStorage.getItem('cityList');  //从本地存储中取回数据
        var hotList = window.localStorage.getItem('setList');
        if(cityList && hotList) {
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList)
        }else {
            this.$axios.get('/api/cityList').then((res) => {
                console.log(res)
                var msg = res.data.msg;
                if( msg === 'ok') {
                    var cities = res.data.data.cities;
                    //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
                    var {cityList, hotList} =  this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    // 将数据存放在本地存储里面
                    window.localStorage.setItem('cityList',JSON.stringify(cityList));
                    window.localStorage.setItem('hotList', JSON.stringify(hotList))
                }
            })
        }
    },
    methods: {
        formatCityList(cities) {
            var cityList = [] ;
            var hotList = [] ;

            // 看这个城市是否是热门城市
            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot === 1){
                    hotList.push( cities[i] );
                }
            }

            for(var i=0;i<cities.length;i++){
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){ //添加到新index中
                    cityList.push({ index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id} ] });
                }else{ // 添加到已有index中
                    for (var j = 0; j<cityList.length; j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push( {nm: cities[i].nm, id : cities[i].id })
                        }
                    }
                }
            }

            //按index排序
            cityList.sort((n1, n2) => {
                if( n1.index > n2.index){
                    return 1;
                }else if( n1.index < n2.index){
                    return -1;
                }else{
                    return 0; // 它们相等的时候
                }
            })

            function toCom(firstLetter) {
                for(var i = 0 ;i<cityList.length; i++){
                    if(cityList[i].index === firstLetter){
                        return false;
                    }
                }
                return true;
            }
            return{
                cityList,hotList
            } 
        },
        handleToIndex(index){
             //右边 A对应左边 A， 依此类推 其索引值相同
             var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            //  console.log(this.$refs.city_sort.parentNode)  //city_list的那个div
            this.$nextTick(() => {
                console.log(11)
                // this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
                
                document.documentElement.scrollTop = h2[index].offsetTop;
                })
            // document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset 浏览器兼容问题
        },
        handleToCity(nm, id){
            this.$store.commit('city/CITY_INFO', {nm ,id});
            window.localStorage.setItem('nowNm', nm);
            window.localStorage.setItem('nowId', id);
            this.$router.push('/movie/nowPlaying')
        }
    }

           
    
}
</script>

<style scoped>
.content{width: 100%; height: 100%;}
/* .city_body{margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;} */
.city_body{ width: 96%; position: relative;display: flex; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{background-color:transparent;width:0;}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
/* .city_body .city_index{ width:20px;border-left:1px #e6e6e6 solid;display: flex; flex-direction:column; justify-content:center; text-align: center;} */
.city_body .city_index{ position: fixed; right:0; top:100px; width:4%;display: flex; flex-direction:column; justify-content:center; text-align: center;}

</style>