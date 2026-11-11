<template>
  <a href="#" class="product-card">
    <div class="product-card__image-wrapper">
      <img
        v-if="!imageFailed"
        :src="product.image"
        :alt="product.name"
        :class="['product-card__image', imageClass]"
        loading="lazy"
        @load="preloadImage(product.image)"
        @error="handleImageError"
      />
      <img
        v-else
        src="/placeholder.svg"
        :alt="product.name + ' (заглушка)'"
        :class="['product-card__image', imageClass]"
        loading="lazy"
      />
    </div>
    <div class="product-card__price">
      <div class="product-card__total-price">
        {{ formatPrice(product.price) }}
      </div>
      <div class="product-card__installment">
        {{ formatPrice(installmentPrice) }} x 2
      </div>
    </div>

    <div class="product-card__title" :title="product.name">
      {{ product.name }}
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";
import { formatPrice } from "~/utils/formatPrice";
import { ref, computed } from "vue";

const props = defineProps<{
  product: Product;
}>();

const { imageClass, preloadImage } = useImageOrientation(props.product);
const imageFailed = ref(false);

const handleImageError = () => {
  imageFailed.value = true;
};

const installmentPrice = computed(() => Math.ceil(props.product.price / 2));
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/product-card.scss";
</style>
