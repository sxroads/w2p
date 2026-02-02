const PROMPTS = [
	'Bir mutfakta bulunan bir şey',
	'Bir renk',
	'Bir hayvan',
	'Bir ülke',
	'Bir yemek türü',
	'Bir şeyler giyersin',
	'Bir spor',
	'Name a vehicle',
	'Bir meslek',
	'Bir film',
	'Bir kitap',
	'Bir şarkı',
	'Bir TV show',
	'Bir video oyunu',
	'Bir meyve',
	'Bir sebze',
	'Bir hızlı yemek öğesi',
	'Bir içki',
	'Bir tatlı',
	'Bir kahvaltı yemiği',
	'Bir içecek',
	'Bir type of clothing',

	'Bir ünlü şehir',
	'Bir ünlü mekan-yapı',
	'Bir dil',
	'Bir para birimi',

	'Bir hayvan',
	'Bir evcil hayvan',
	'Bir deniz hayvanı',
	'Bir böcek',

	'Bir film türü',
	'Bir müzik türü',
	'Bir müzik aleti',
	'Bir grup veya şarkıcı',

	'Bir mobil uygulama',
	'Bir sosyal medya platformu',
	'Bir web sitesi',

	'Bir sabah işi',
	'Bir uyku öncesi işi',

	'Bir tatil',
	'Bir hava tipi',

	'Bir vücut parçası',
	'Bir duygu',

];

export function getRandomPrompt(): string {
	return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

