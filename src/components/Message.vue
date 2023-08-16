<template>
    <div class="p-3" :style="`border-radius: 15px; background-color: ${bgColor}; min-height: 1rem;`">
        <p class="small mb-0">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: ["message", 'bgColor'],
}
</script>