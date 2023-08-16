<template>
    <div class="img-container" :style="`background-color: ${bgColor};`">
        <component :is="avatar" class="avatar h-100 w-100" alt="avatar 1"></component>
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: ['avatar', 'bgColor'],
}
</script>

<style lang="scss" scoped>
.img-container{
    width: 45px;
    height: 45px;
    min-width: 45px;
    min-height: 45px;
    padding: 8px;
    border-radius: 100%;
}

</style>