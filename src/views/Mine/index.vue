<template>
    <div id='main'>
        <header-top title="我的主页" />
        <Login />
        <footer-line />
    </div>
</template>
    
<script>
import HeaderTop from '@/components/Header'
import FooterLine from '@/components/TabBar'
import Login from '@/components/Login'

export default {
    name: 'Mine',
    data() {
        return {
    
        }
    },
    components: {
        HeaderTop,
        FooterLine,
        Login
    }
}
</script>
    
<style>
    
</style>