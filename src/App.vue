<template>
<Teleport to="body">
    <div class="wrapper position-absolute bottom-0 end-0 overflow-hidden col-md-6 col-xxl-3 col-xl-4 col-lg-5 col-sm-6" ref="wrapper">
      <div 
        class="toggle btn btn-primary w-100"
        @click="togglePopup"
      >
        Live chat
      </div>
    <Transition name="popup">
      <div v-show="openPopup" class="popup">

        <div class="view-chat w-100 overflow-hidden mh-100 h-100">
          <div class='chat-body p-3 overflow-auto ' id="chat1" ref="chatBody">
            <TransitionGroup name="bubbles">
              <Bubble 
                  v-for="bubble, i in messageHistory"
                  :key="i"
                  :message="bubble.message" 
                  :avatar="bubble.author" 
                  :side="bubble.side" 
                  v-scroll="i===messageHistory.length-1"
                  @showed-message="showedMessageHandler"
              />
            </TransitionGroup>
          </div>
        </div>

        <Transition 
          name="command"
          @enter="scrollChat"
          @after-leave="commandHide"
        >
          <Commands 
              v-if="showStart"
              :commands="bot.commandStart" 
              @showed="scrollChat"
              @command="commandHandler" 
          />
        </Transition>

        <Transition 
          name="command"
          @enter="scrollChat"
          @after-leave="commandHide"
        >
          <Commands 
              v-show="showCommand"
              :commands="bot.command" 
              @showed="scrollChat"
              @command="commandHandler" 
          />
        </Transition>
      </div>
    </Transition>
    </div>
</Teleport>
</template>

<script>
import {ref, reactive} from 'vue';
import {Bot} from '@/components/Bot';
import Bubble from '@/components/Bubble.vue';
import Commands from '@/components/Commands.vue';
import botAvatar from '@/assets/bot-svgrepo-com.svg'
import userAvatar from '@/assets/person-svgrepo-com.svg'
import '@/scss/style.scss'

export default {
  components: {
    Bubble, Commands
  },

  setup(){
    return {
      wrapper: ref(),
      openPopup: ref(false),
      bot: new Bot(),
      messageHistory: reactive([]),
      showCommand: ref(false),
      startChat: ref(false),
      showStart: ref(true),
    }
  },

  data(){
    return {
      botAvatar,
      userAvatar,
      nextMessage: null,
    }
  },

  mounted(){
    this.togglePopup();
  },

  directives: {
    scroll: {
      mounted: (el, {value}) => {
        if (value) el.scrollIntoView()
      }
    }
  },

  methods: {
    togglePopup(){
      this.openPopup = !this.openPopup;
      this.$refs.wrapper.classList.toggle('wrapper-show');
    },

    commandHandler(commandId, commandText){
        this.nextMessage = {message: commandText, author: this.userAvatar, side: 'right'};
        this.bot.pickedCommand = commandId;
        this.showCommand = false;
        this.showStart = false;
    },

    showedMessageHandler(){
        if (this.bot.pickedCommand){
            this.messageHistory.push({message: this.bot.pickedCommandText, author: this.botAvatar, side: 'left'});
        } else {
            this.showCommand = true;
        }
    },

    commandHide(){
      this.messageHistory.push(this.nextMessage);
    },

    scrollChat(){
      let last = this.$refs.chatBody.children.length-1
      this.$refs.chatBody.children[last].scrollIntoView();
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper{
  transition: all 0.5s ease;
  box-shadow: -1px -1px 11px #ccc;
  border-radius: 27px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.toggle{
  padding: 0.5em 6em;
  border-radius: 1.5em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.popup{
  height: 420px;
  display: flex;
  flex-direction: column;
  transition-timing-function: cubic-bezier(1,-0.42,.42,-0.39);

  &-enter-active,
  &-leave-active{
    transition: all 0.5s;
    transition-timing-function: cubic-bezier(0.3, 0.01, 0.37, 1.46);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    height: 0;
  }
}
.view-chat{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.chat-body{
  border-radius: 15px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar{
    display: none;
  }
}

.command{
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active{
    transition: all 0.5s ease;
  }
  &-leave-active {
    transition: all 0.3s ease;
  }
}

.bubbles{
  &-enter-active,
  &-leave-active {
    transition: all 0.5s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

@media (max-height: 500px) {
  .popup{
    height: 80vh;
  }
}

@media (max-width: 576px) {
  .wrapper{
    width: 100%
  }
}
</style>
