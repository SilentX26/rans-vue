<script setup>
import './../assets/select2.css'
</script>

<template>
    <select class="w-full">
    </select>
</template>

<script>
export default {
    name: 'Select2',
    props: ['options', 'value', 'label'],
    mounted() {
        const $this = this
        $(this.$el)
            .select2({ 
                data: this.options,
                placeholder: this.label,
            })
            .val(this.value)
            .trigger("change")
            .on("change", function() {
                $this.$emit("input", this.value)
            });
    },
    watch: {
        value: (val) => {
            $(this.$el).val(val).trigger('change')
        },
        options: (options) => {
            $(this.$el).empty()
                .select2({ 
                    data: options,
                    placeholder: this.label,
                })
        },
    },
    destroyed() {
        $(this.$el).off().select2('destroy')
    },
}
</script>