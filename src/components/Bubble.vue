<template>
<div>
    <div class="d-flex flex-row justify-content-start gap-2 mb-4 align-items-center" v-if="side==='left'">
        <Avatar :avatar="avatar" :bg-color="'#000000a8'"/>
        <Message :message="viewMessage" :bg-color="'#d8d8d833'"/>
    </div>

    <div class="d-flex flex-row justify-content-end gap-2 mb-4 align-items-center" v-if="side==='right'">
        <Message :message="viewMessage" :bg-color="'#6578fa57'"/>
        <Avatar :avatar="avatar" :bg-color="'#4d5bba'"/>
    </div>
</div>
</template>

<script>
import {ref} from 'vue';
import Avatar from '@/components/Avatar.vue';
import Message from '@/components/Message.vue';

export default {
    name: 'Bubble',
    components: {Avatar, Message},
    props: ['avatar', 'message', 'side'],
    emits: ['showedMessage'],
    setup () {
        return {
            viewMessage: ref('.')
        }
    },

    mounted(){
        this.animateTyping();
    },

    methods: {
        animateTyping(){
            let animId = setInterval(() => {
                if (this.viewMessage.length < 3) {
                    this.viewMessage += '.';
                } else {
                    this.viewMessage = '.';
                }
            }, 300);

            let timeoutId = setTimeout(() => {
                clearInterval(animId);
                this.showMessage();
            }, 2000);
        },

        showMessage(){
            this.viewMessage = this.message;
            this.$emit('showedMessage');
        },
    },

}
</script>