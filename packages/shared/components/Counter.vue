<template>
  <div class="counter">
    <h2>Pinia Counter Store</h2>
    <p class="count">{{ count }}</p>
    <p class="double-count">Double: {{ doubleCount }}</p>

    <div class="buttons">
      <button @click="decrement" class="btn btn-decrease">-</button>
      <button @click="increment" class="btn btn-increase">+</button>
      <button @click="reset" class="btn btn-reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment, decrement, reset } = counterStore
</script>

<style scoped>
.counter {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.count {
  font-size: 3rem;
  font-weight: bold;
  color: #42b883;
  text-align: center;
}

.double-count {
  text-align: center;
  color: #666;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-decrease {
  background-color: #e74c3c;
  color: white;
}

.btn-increase {
  background-color: #42b883;
  color: white;
}

.btn-reset {
  background-color: #3498db;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0);
}
</style>
