<template>
  <div class="container-fluid">
	  	<div class="task">
		<h3 class="mb-1">TAREFAS</h3>
		<input type="text" name="description" id="description" class="form-control" @keyup.enter="addTask()" v-model="description">
	</div>
	<div class="row">
		<div class="col-12">
		<ul class="list-group ">
		 <li v-for="(task, index) in tasks" :key="task[index]" class="task-item list-group-item col-12" :class="{'active': !task.status}" >
		  <span @click="statusState(task)" class="status">{{task.description}}</span>
		  <span @click="remove(task)" class="btn btn-danger pull-right">X</span>
		 </li>
	 </ul>
	</div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data() {
	  return {
      description: '',
	  status: true,
	  tasks: [],
	  };
  },
  computed: {
    // tasks() {
    //   return this.$store.state.tasks;
    // },
  },
  methods: {
    addTask() {
      const task = { description: this.description, status: this.status };
      this.$store.dispatch('SET_TASKS', task);
      this.description = '';
      this.update();
    },
    remove(task) {
      this.$store.dispatch('REMOVE_TASK', task).then(response => this.update());
    },
    statusState(task) {
      task.status = !task.status;
      console.log(task.status);
      this.$store.dispatch('EDIT_TASK', task).then((response) => {
        this.update();
	  });
    },
    update() {
      this.$store.dispatch('TASKS', null).then((response) => {
		  this.tasks = response.data;
	  });
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.active{
	text-decoration:line-through
}
.pull-right{
	position: absolute;
    right: 1rem;
    top: 0.3rem;
}
.status{
	display: block;
}


</style>
