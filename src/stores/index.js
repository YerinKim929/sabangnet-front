// Utilities
import { createPinia } from 'pinia'

export default createPinia()

import {ref, computed} from 'vue'
import { defineStore } from 'pinia'


export const useInputTextForSearchStore = defineStore('InputTextForSearch', ()=>{
    
    const Input_Text_List_For_Search = ref(["","","",""])

    function updateInputTextListForSearch(newText, id){
        Input_Text_List_For_Search.value[id] = newText
    }
    function ClearInputTextListForSearch(){
        for(let i=0 ;i<4; i++)
            this.Input_Text_List_For_Search[i] = ""  
    }

    return {Input_Text_List_For_Search, updateInputTextListForSearch, ClearInputTextListForSearch}
})

