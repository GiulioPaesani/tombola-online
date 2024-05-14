import { readdirSync } from 'fs';
import path from 'path';

type File = {
	name: string;
	directory: string;
	[key: string]: unknown;
};

const getAllFiles = async (directory: string) => {
	const files: File[] = [];

	const filesName = readdirSync(directory, {
		withFileTypes: true
	});

	for (const fileName of filesName) {
		if (fileName.isDirectory()) {
			const folderFiles = await getAllFiles(path.join(directory, fileName.name));

			files.push(...folderFiles);
		} else {
			const content = await import(path.join(directory, fileName.name));
			files.push({
				name: fileName.name.slice(0, -3),
				directory,
				...content.default
			});
		}
	}

	return files;
};

export default getAllFiles;
