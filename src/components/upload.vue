<template>
    <my-upload
               field="img"
               lang-type="en"
               :params="params"></my-upload>
</template>
<script>
    import 'babel-polyfill'; // es6 shim
    import Vue from 'vue';
    import myUpload from 'vue-image-crop-upload';
    export default {
        components: {
            myUpload
        },
        data: function(){
            return {
                show: true,
                params: {
                    /*token: '123456798',
                    name: 'avatar'*/
                }
            }
        },
        methods: {

        },
        events: {
            /**
             * crop success
             *
             * [param] jsonData
             * [param] field
             */
            cropSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }
</script>

