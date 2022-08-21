<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadIcon, getIcon } from '../util/iconify'
import type {FullIconCustomisations} from '@iconify/utils/lib/customisations'
import { iconToSVG,replaceIDs } from '@iconify/utils'
import { encodeSvgForCss } from '@iconify/utils/lib/svg/encode-svg-for-css'

const props = withDefaults(defineProps<{
  iconName: string,
  size?: number | string,
}>(), {
  size:1.2,
})

let collection = ''
let name = ''
if (props.iconName.includes(':')) {
  [collection, name] = props.iconName.split(':')
}

loadIcon(props.iconName)

const iconData = getIcon(props.iconName)
if (!iconData) {
   throw new Error(`Icon "${name}" is missing`);
}

const options:FullIconCustomisations = {
  // Display mode
	inline: false,

	// Dimensions
	width: '19px',
	height: '19px',

	// Alignment
	hAlign: 'center',
	vAlign: 'middle',
	slice: false,

	// Transformations
	hFlip: false,
	vFlip: false,
	rotate: 0,
}
const renderData = iconToSVG(iconData,options)

const svgAttributes: Record<string, string> = {
   'xmlns': 'http://www.w3.org/2000/svg',
   'xmlns:xlink': 'http://www.w3.org/1999/xlink',
   ...renderData.attributes,
};
const svgAttributesStr = Object.keys(svgAttributes)
   .map(
       (attr) =>
           // No need to check attributes for special characters, such as quotes,
           // they cannot contain anything that needs escaping.
           `${attr}="${svgAttributes[attr as keyof typeof svgAttributes]}"`
   )
   .join(' ');

//Generate SVG
const svg = `<svg ${svgAttributesStr}>${replaceIDs(renderData.body)}</svg>`;
const uri = ref(`url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`)
onMounted(()=>{
  document.styleSheets[0].insertRule(`.${collection}-${name} {
    background:${uri.value} no-repeat;
    -webkit-background:${uri.value} no-repeat;
    background-size:100% 100%;
    -webkit-background-size:100% 100%;
    background-color:transparent;
    width:${props.size}em;
    height:${props.size}em;
  }`)
})
</script>
<template>
  <div :class="`${collection}-${name}`"/>
</template>

<style scoped>
.elone-hoo{}
</style>
