<script>
	import TasksStore from '../stores/tasks.js';
	import UserStore from '../stores/user.js';

	let user = $UserStore;
	$: userID = user.uid;

	let taskName;
	let editedTaskID;
	let editedTaskIndex;
	let taskBeingEdited = false;

	const addTask = () => {
		TasksStore.addTask(taskName, userID);
		taskName = '';
	};

	const deleteTask = () => {
		TasksStore.deleteTask(editedTaskID, userID, editedTaskIndex)
		clearEditVariables();
	};

	const editTask = () => {
		TasksStore.editTaskName(taskName, editedTaskID, userID, editedTaskIndex);
		clearEditVariables();
	};

	const clearEditVariables = () => {
		taskBeingEdited = false;
		editedTaskIndex = '';
		taskName = '';
	}
</script>

<style>
	p.done {
		text-decoration: line-through;
		color: grey;
	}

	p.taskName + button {
		display: none;
	}
	.task:hover > button {
		display: block;
	}
</style>

<div class="tasks-container p-32">
	<div class="add-edit-task mb-16">
		<form
			on:submit|preventDefault={taskBeingEdited ? editTask : addTask}
			class="flex w-full items-center gap-x-4">
			<input type="text" bind:value={taskName} class="bg-gray-100 p-2" />
			<button
				type="submit"
				class="bg-gray-100 p-2 pl-6 pr-6 font-bold hover:bg-gray-500 hover:text-gray-100
				transition-all duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110
				outline-none border-none">
				{taskBeingEdited ? 'Edit Task' : 'Add Task'}
			</button>
		</form>
	</div>

	<div class="tasks flex flex-col gap-y-3">
		{#each $TasksStore as { name, docID, done }, i}
			<div class="task flex justify-start items-center gap-x-4">
				<input
					type="checkbox"
					checked={done}
					on:change={() => {
						TasksStore.updateTaskDoneStatus(docID, userID);
					}} />
				<p
					class="{done ? 'done' : 'notDone'} taskName"
					id={docID}
					on:click={() => {
						taskBeingEdited = true;
						taskName = name;
						editedTaskIndex = i;
						editedTaskID = docID;
					}}>
					{name}
				</p>
				<button
					class="bg-gray-400 p-1 text-xs rounded-lg text-white transition-all duration-250
					ease-in-out hover:bg-gray-700"
					on:click={() => {
						editedTaskIndex = i;
						editedTaskID = docID;
						deleteTask();
					}}>
					delete
				</button>
			</div>
		{/each}
	</div>
</div>
