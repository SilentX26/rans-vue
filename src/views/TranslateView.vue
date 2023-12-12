<template>
    <div class="flex items-start justify-between mt-8 w-8/12 mx-auto">
        <div class="bg-gray-800 p-4 text-white rounded shadow-lg w-5/12">
            <Select2 :options="listLanguages" label="Pilih Bahasa Asal" 
                v-if="listLanguages.length > 0" @input="sourceLanguage = $event"></Select2>

            <textarea rows="8" placeholder="Masukkan teks" v-model="originalText"
                class="w-full mt-4 rounded bg-slate-500 p-3 focus:outline-0 text-sm"></textarea>
        </div>

        <div class="flex flex-col">
            <button class="p-4 hover:-translate-y-1 hover:scale-100 hover:bg-cyan-500 bg-sky-700 text-white rounded-xl transition delay-100 duration-300 ease-in-out mt-4" @click="submitTranslate()">Translate</button>
            <RouterLink to="/" class="p-3 hover:-translate-y-1 hover:scale-100 hover:bg-rose-500 bg-red-700 text-white rounded-xl transition delay-100 duration-300 ease-in-out mt-5 text-center text-2xl">&laquo;</RouterLink>
        </div>

        <div class="bg-gray-800 p-4 text-white rounded shadow-lg w-5/12">
            <Select2 :options="listLanguages" label="Pilih Bahasa Target" 
                v-if="listLanguages.length > 0" @input="targetLanguage = $event"></Select2>

            <textarea rows="8" placeholder="Terjemahan" v-model="resultText" readonly
                class="w-full mt-4 rounded bg-gray-700 p-3 focus:outline-0 text-sm"></textarea>
        </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import axios from 'axios'

export default {
    data() {
        return {
            listLanguages: [],
            originalText: '',
            sourceLanguage: '',
            resultText: '',
            targetLanguage: '',
        }
    },
    methods: {
        submitTranslate() {
            if(!this.originalText) {
                return alert('Harap masukkan teks yang akan diterjemahkan!')
            }

            if(!this.sourceLanguage) {
                return alert('Harap pilih bahasa asal!')
            }

            if(!this.targetLanguage) {
                return alert('Harap pilih bahasa tujuan!')
            }

            this.resultText = 'Loading..'
            axios({
                method: 'POST',
                url: import.meta.env.VITE_TRANSLATE_BASE_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': import.meta.env.VITE_TRANSLATE_KEY,
                    'X-RapidAPI-Host': import.meta.env.VITE_TRANSLATE_HOST,
                },
                data: new URLSearchParams({
                    q: this.originalText,
                    source: this.sourceLanguage,
                    target: this.targetLanguage,
                })

            }).then( ({ data }) => {
                this.resultText = data['data']['translations'][0]['translatedText']

            }).catch( error => {
                this.resultText = error.message
            })
        },
        getLanguages() {
            axios({
                method: 'GET',
                url: import.meta.env.VITE_TRANSLATE_BASE_URL + 'languages?target=id',
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_TRANSLATE_KEY,
                    'X-RapidAPI-Host': import.meta.env.VITE_TRANSLATE_HOST,
                }

            }).then( ({ data: response }) => {
                this.listLanguages = []

                response.data.languages.forEach( value => {
                    this.listLanguages.push({
                        id: value.language,
                        text: value.name,
                    })
                })

            }).catch( error => {
                alert('Request getLanguages gagal, ' +  error.message);
                console.error(error)
            })
        },
    },
    mounted() {
        this.getLanguages()
    }
}
</script>