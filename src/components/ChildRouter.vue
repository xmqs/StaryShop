<template>
    <div>
      {{msg}}{{$route.params.childId}}
    </div>
</template>

<script>
  import axios from "axios"
    export default {
      name: 'ChildRouter',
      data () {
        return {
          msg:"child"
        }
      },
      mounted(){
        axios({
          url:'/192.16.011',
          method: 'post',
          dataType:'json',
          data:[1,2,3,6],
        })
      }
    }
</script>

<style scoped>

</style>
