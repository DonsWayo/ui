<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableHead,
		TableCell,
		TableCaption,
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Table',
		component: Table,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	<Table>
		<TableCaption>A list of team members.</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead>Email</TableHead>
				<TableHead>Role</TableHead>
				<TableHead>Status</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<TableCell>Alice Johnson</TableCell>
				<TableCell>alice@nucel.io</TableCell>
				<TableCell>Admin</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Bob Smith</TableCell>
				<TableCell>bob@nucel.io</TableCell>
				<TableCell>Member</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Carol White</TableCell>
				<TableCell>carol@nucel.io</TableCell>
				<TableCell>Viewer</TableCell>
				<TableCell>Inactive</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Dan Brown</TableCell>
				<TableCell>dan@nucel.io</TableCell>
				<TableCell>Member</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</Story>

<Story name="Striped">
	<Table>
		<TableCaption>Striped rows using alternating background.</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead>Email</TableHead>
				<TableHead>Role</TableHead>
				<TableHead>Status</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<TableCell>Alice Johnson</TableCell>
				<TableCell>alice@nucel.io</TableCell>
				<TableCell>Admin</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
			<TableRow class="bg-muted/20">
				<TableCell>Bob Smith</TableCell>
				<TableCell>bob@nucel.io</TableCell>
				<TableCell>Member</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Carol White</TableCell>
				<TableCell>carol@nucel.io</TableCell>
				<TableCell>Viewer</TableCell>
				<TableCell>Inactive</TableCell>
			</TableRow>
			<TableRow class="bg-muted/20">
				<TableCell>Dan Brown</TableCell>
				<TableCell>dan@nucel.io</TableCell>
				<TableCell>Member</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Eve Davis</TableCell>
				<TableCell>eve@nucel.io</TableCell>
				<TableCell>Viewer</TableCell>
				<TableCell>Active</TableCell>
			</TableRow>
			<TableRow class="bg-muted/20">
				<TableCell>Frank Miller</TableCell>
				<TableCell>frank@nucel.io</TableCell>
				<TableCell>Member</TableCell>
				<TableCell>Inactive</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</Story>
