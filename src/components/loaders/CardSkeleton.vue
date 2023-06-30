<template>
  <div class="animate-pulse">
    <div class="card-skeleton w-100 border rounded-[10px] overflow-hidden">
      <div class="card-skeleton__thumb h-[150px] bg-slate-100"></div>
      <div class="card-skeleton__caption p-4">
        <div
          class="card-skeleton__heading line h-5 w-1/2 rounded-full bg-slate-100 mb-3"
        ></div>
        <div class="card-skeleton__description grid gap-1">
          <div class="line h-3 w-full rounded-full bg-slate-100"></div>
          <div class="line h-3 w-full rounded-full bg-slate-100"></div>
          <div class="line h-3 w-full rounded-full bg-slate-100"></div>
          <div class="line h-3 w-3/4 rounded-full bg-slate-100"></div>
        </div>
      </div>
    </div>
  </div>
</template>
