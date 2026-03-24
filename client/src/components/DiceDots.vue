<template>
  <div class="dots" :class="'dots-' + value">
    <span v-for="n in value" :key="n" class="dot"></span>
  </div>
</template>

<script setup>
defineProps({
  value: { type: Number, default: 1 },
})
</script>

<style scoped>
.dots {
  width: 38px;
  height: 38px;
  display: grid;
  padding: 3px;
  gap: 2px;
}

.dot {
  width: 9px;
  height: 9px;
  background: radial-gradient(circle, #fff 30%, var(--color-parchment-dark) 100%);
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* 1 dot — center */
.dots-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 2 dots — diagonal */
.dots-2 {
  display: flex;
  justify-content: space-between;
}
.dots-2 .dot:nth-child(1) { align-self: flex-start; }
.dots-2 .dot:nth-child(2) { align-self: flex-end; }

/* 3 dots — diagonal */
.dots-3 {
  display: flex;
  justify-content: space-between;
}
.dots-3 .dot:nth-child(1) { align-self: flex-start; }
.dots-3 .dot:nth-child(2) { align-self: center; }
.dots-3 .dot:nth-child(3) { align-self: flex-end; }

/* 4 dots — 2x2 grid */
.dots-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
}

/* 5 dots — 2x2 + center */
.dots-5 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}
.dots-5 .dot:nth-child(1) { grid-area: 1 / 1; }
.dots-5 .dot:nth-child(2) { grid-area: 1 / 3; }
.dots-5 .dot:nth-child(3) { grid-area: 2 / 2; }
.dots-5 .dot:nth-child(4) { grid-area: 3 / 1; }
.dots-5 .dot:nth-child(5) { grid-area: 3 / 3; }

/* 6 dots — 3x2 grid */
.dots-6 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}
</style>
