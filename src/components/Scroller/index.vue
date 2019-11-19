<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll' 
export default{
    name: 'Scroll',
    props: {
        handlerToScroll: {
            type: Function,
            default: function(){}
        },
        handlerToTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted() {
        var scroll =  new BScroll(this.$refs.wrapper, {
            //配置项
            tap: true,
            probeType: 1 //节流之类的？？
        })

        scroll.on('scroll', (pos) => {
            this.handlerToScroll(pos)
        })
        scroll.on('touchEnd', (pos) => {
            this.handlerToTouchEnd(pos)  //把pos回调出去
        })
    },
    methods: {
        toScrollTop(y) {
            this.scroll.scrollTop(0,y)
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
}
</style>