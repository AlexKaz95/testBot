<template>
    <ul class="list-group commands">
        <li class="list-group-item px-0 border-0" v-for="[id, command] in viewCommands" :key="id">
            <span class="btn btn-primary btn-command" @click="$emit('command', id, command)">{{ command }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Commands',
    props: ['commands'],
    emits: ['showed', 'command'],
    computed: {
        viewCommands(){
            return Object.entries(this.commands)
        }
    }
}
</script>

<style lang="scss" scoped>
.commands{
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    width: 100%;
    flex-direction: row;
}

.btn-command{
    width: 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

li{
    padding: 0;
    min-width: max-content;
    flex-grow: 1;
}

</style>