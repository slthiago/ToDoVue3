<template>
  <div class="px-3 py-10 md:px-10">
	<div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

		<TodoSpinner 
      v-if="loading"
    />

    <template v-else>
      <TodoFormAdd />

      <TodoItems 
        v-if="$store.state.todos.length"
      />

      <TodoEmpty v-else/>
    </template>
		
	</div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'
import TodoSpinner from './components/TodoSpinner';
import TodoFormAdd from './components/TodoFormAdd';
import TodoItems from './components/TodoItems';
import TodoEmpty from './components/TodoEmpty';

export default {
  name: 'App',
  components: {
    TodoSpinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty
  },

  setup() {
    const loading = ref(false);
    const store = useStore()

    loading.value = true
    //chama a action que realiza a requisição para a api
    store.dispatch('getTodos').finally(() => {
      loading.value = false
    })

    //retorna variáveis que serão utilizadas no dom (compostion api vue3)
    return {
      loading
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
