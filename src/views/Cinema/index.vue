<template>
<div id='main'>
    <header-top title="查看电影" />
    <div id='content'>
        <div class="cinema_menu">
            <div class="city_switch">
                全城 <i class="iconfont icon-lower-triangle"></i>
            </div>
            <div class="brand_swtich">
                品牌 <i class="iconfont icon-lower-triangle"></i>
            </div>
            <div class="feature_switch">
                特色 <i class="iconfont icon-lower-triangle"></i>
            </div>
        </div>
        <cinema-list />
    </div>
    <footer-line />
</div>
</template>

<script>
import HeaderTop from '@/components/Header'
import FooterLine from '@/components/TabBar' 
import CinemaList from '@/components/Cinema'

export default {
    name: 'Cinema',
    data() {
        return {

        }
    },
    components: {
        HeaderTop,
        FooterLine,
        CinemaList
    }
}
</script>

<style scoped>
#content .cinema_menu{ 
    width: 100%;
    height: 45px;
    border-bottom:1px solid #e6e6e6;
    display: flex; 
    justify-content:space-around;
     align-items:center; background:white;}

</style>