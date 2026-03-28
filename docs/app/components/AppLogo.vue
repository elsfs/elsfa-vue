<template>
  <ClientOnly>
    <svg
      width="1020"
      height="200"
      viewBox="0 0 1020 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#bd34fe"/>
          <stop offset="100%" stop-color="#41d1ff"/>
        </linearGradient>
      </defs>
      <text
        fill="url(#gradient)"
        font-family="Arial Black, sans-serif"
        font-size="250"
        font-weight="bold"
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
      >elsfs</text>
    </svg>
    <template #fallback>
      <svg
        width="1020"
        height="200"
        viewBox="0 0 1020 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#bd34fe"/>
            <stop offset="100%" stop-color="#41d1ff"/>
          </linearGradient>
        </defs>
        <text
          fill="url(#gradient)"
          font-family="Arial Black, sans-serif"
          font-size="250"
          font-weight="bold"
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
        >elsfs</text>
      </svg>
    </template>
  </ClientOnly>
</template>
