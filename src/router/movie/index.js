export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'coming',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/nowPlaying')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: 'detail/1/:movieId',
            components: {
                default: () => import('@/components/nowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying' 
        }
    ]
}
