<script>
	import Button from '../components/Button.svelte';
	import Card from '../components/Card.svelte';
	import Input from '../components/Input.svelte';
	import TextInput from '../components/TextInput.svelte';
	import Pagination from '../components/Pagination.svelte';
	import Icon from '../components/Icon.svelte';
	import PopUp from '../components/PopUp.svelte';
	import DatePicker from '../components/DatePicker.svelte';

	import { showPageContent } from '../api/store.js';

	let popUp;
	
</script>

<style global lang="scss">
	@import "./styles/base/_all.scss";

  .page-content {
    display: grid;
    gap: $margin-default;
    padding: $margin-default;
	}
	
	.page-content.hide {
		max-height: 100%;
		max-width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.divisor {
		height: 12px;
	}

</style>

<div class="page-content" class:hide={ !$showPageContent }>
	<PopUp bind:this={ popUp }/>
	<Card
		title="Sveltenents"
		controllerLabel="EDIT"
	>
		<div slot="content">
			<h1>H1 - Header</h1>
			<h2>H2 - Header</h2>
			<h3>H3 - Header</h3>
			<p>
				Eggnog scarf calendar elves, love chimney elves give decorate cookie. 
				Gift chestnuts chestnuts celebration scarf noel december. 
				Bells chimney icicle reindeer holiday ivy, singing stocking stocking calendar ivy. 
				Carols tree stocking, december lights carols noel lights singing give carols ivy chestnuts. 
				Stocking wreath chestnuts angel cookie wintertime scarf give. 
				Chimney elves santa tree singing eggnog, elves december ivy yule gold scarf eggnog. 
				Santa frosty toys guest carols, holiday lights bells Christmas santa reindeer gold carols. 
				Elves singing chestnuts holiday, calendar ivy wreath reindeer singing decorate love celebration. 
				Yule singing goodwill toys eggnog calendar icicle yule.
			</p>
			<h2>Button</h2>
			<Button>Teste</Button>
			<div class="divisor"></div>
			<h2>Input</h2>
			<Input/>
			<div class="divisor"></div>
			<h2>Input with Icon</h2>
			<Input leftIcon="user"></Input>
			<div class="divisor"></div>
			<Input leftIcon="key" type="password"></Input>
			<div class="divisor"></div>
			<h2>Text Input</h2>
			<TextInput></TextInput>
			<div class="divisor"></div>
			<h2>Pagination</h2>
			<Pagination></Pagination>
			<h2>Icons</h2>
			<Icon name="feather"/>
			<Icon name="phone" active/>
			<Icon name="alert-triangle" warning fill/>
			<div class="divisor"></div>
			<h2>Pop Up </h2>
			<Button on:click={ ()=> { popUp.open(1500) }}>Click to Open</Button>
			<div class="divisor"></div>
			<DatePicker></DatePicker>
		</div>
	</Card>
</div>