<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <rect width="24" height="24" fill="url(#pattern5)" />
    <defs>
      <pattern
        id="pattern5"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlink:href="#image5" transform="scale(0.015625)" />
      </pattern>
      <image
        id="image5"
        width="64"
        height="64"
        xlink:href="data:image/png;base64,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"
      />
    </defs>
  </svg>
</template>
