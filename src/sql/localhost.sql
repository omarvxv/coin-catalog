-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 26 2020 г., 18:33
-- Версия сервера: 5.7.23-24
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u1062375_default`
--
CREATE DATABASE IF NOT EXISTS `coin_catalog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `coin_catalog`;

-- --------------------------------------------------------

--
-- Структура таблицы `coins`
--

CREATE TABLE `coins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avers` varchar(255) NOT NULL,
  `revers` varchar(255) NOT NULL,
  `shortdesc` text NOT NULL,
  `description` text NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `composition` varchar(255) DEFAULT NULL,
  `quality` varchar(255) DEFAULT NULL,
  `denomination` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `group` enum('1','2','3') NOT NULL DEFAULT '1' COMMENT 'group of coins',
  `seen` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `coins`
--

INSERT INTO `coins` (`id`, `name`, `avers`, `revers`, `shortdesc`, `description`, `country`, `composition`, `quality`, `denomination`, `year`, `weight`, `price`, `group`, `seen`) VALUES
(1, 'Canadian Beaver', 'https://i.postimg.cc/7LcZyQhd/Canadian-Beaver-1.png', 'https://i.postimg.cc/9FpXffzG/Canadian-Beaver-2.png', 'Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.', 'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D &middot; G &middot; REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.|In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription &quot;5 cents&quot; between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.', 'CANADA', 'nickel', 'BU', '5 cents', '1965', '4.54 g', '40$', '3', 26),
(2, 'Looney', 'https://i.postimg.cc/bY2cMwQz/Looney-1.png', 'https://i.postimg.cc/Kz6VFtnm/Looney-2.png', 'Unique coin with the image of a goat. Canadian dollar symbol.', 'The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle &quot;Canadian dollar&quot;.|The obverse depicts Queen Elizabeth II. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D &middot; G &middot; REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.', 'CANADA', 'gold', 'BU', '1 dollar', '1970', '5.4 g', '65$', '3', 31),
(3, 'Jefferson', 'https://i.postimg.cc/KvzcR2Tw/Jefferson-1.png', 'https://i.postimg.cc/Gh5LD5J2/Jefferson-2.png', 'Unique coin featuring Thomas Jefferson, the 3rd American president. Face value - 5 cents.', 'The obverse of the coin depicts a bust of the 3rd American president, Thomas Jefferson. The inscription on the right semicircle &quot;IN GOD WE TRUST&quot;. Below is the inscription &ldquo;FREEDOM&rdquo; and the year of minting. Under the image of Jefferson was a monogram of an engraver. The initials of the engraver FS first appeared on coins in 1966.|The reverse side shows the Jefferson Monticello estate, as well as the inscription: on the top - the motto &ldquo;E PLURIBUS UNUM&rdquo;, on the bottom - the inscriptions &ldquo;MONTICELLO&rdquo;, &ldquo;FIVE CENTS&rdquo; and &ldquo;UNITED STATES OF AMERICA&rdquo;.', 'UNITED STATES OF AMERICA', 'nickel', 'BU', '5 cents', '1966', '3.54 g', '35$', '3', 20),
(4, 'Kennedy', 'https://i.postimg.cc/L6wS5Z2g/Kennedy-1.png', 'https://i.postimg.cc/j5M0bDM5/Kennedy-2.png', 'The unique coin is made in honor of the assassination of the 35th president of Texas.', 'On November 22, 1963, in connection with the assassination of the 35th President John F. Kennedy in Dallas (Texas), it was decided to perpetuate the memory of President Kennedy on a coin.|On the obverse to the right is a portrait of the 35th President of the United States, John F. Kennedy. Captions: FREEDOM / IN GOD WE TRUST / 1993.|The reverse depicts the US state emblem (bald eagle with a shield) in the ring of stars. Captions: UNITED STATES OF AMERICA / E PLURIBUS UNUM / HALF DOLLAR.', 'UNITED STATES OF AMERICA', 'nickel', 'BU', 'HALF DOLLAR', '1963', '4.3 g', '43$', '3', 58),
(5, 'Canadian Cent', 'https://i.postimg.cc/Zq14QBDh/Canadian-Cent-1.png', 'https://i.postimg.cc/MKWxg8tX/Canadian-Cent-2.png', 'A unique coin with the image of maple leaves - symbols of Canada. Face value - 1 cent.', 'On May 3, 2012, the Department of the Treasury of Canada announced the cessation of production of a 1 cent coin. The latest issues of the famous 1-cent maple leaf were minted in 2012.|On the reverse, in the center of the coin are two maple leaves (the symbol of Canada), the year of issue is 2012 on the left. The upper part of the coin shows the denomination: 1 cent (1 cent), in the lower part of the inscription in a semicircle: CANADA.|On the obverse in the center of the coin on the right is a portrait of Queen Elizabeth II. Along the edge of the coin there is an inscription: Elizabeth II D G REGINA.', 'CANADA', 'steel', 'BU', '1 cent', '1965', '2.7 g', '8$', '3', 4),
(6, 'A penny ', 'https://i.postimg.cc/kG8x3bc3/A-penny-1.png', 'https://i.postimg.cc/kM885WxL/A-penny-2.png', 'A unique coin with a shield image with 13 vertical stripes.', 'Minted from 1793 to the present day.|In 1959, on the 150th anniversary of the birth of Lincoln, the reverse design was changed. Instead of wheat spikelets, the image of the Lincoln Memorial was depicted on the coin. On the surviving copies you can see the image of the statue of the 16th American president between the columns. Coins of this type were minted in multi-billion copies until 2008.|Another round date (200 years since the birth) was marked by the minting of 4 coins, which symbolized the periods of life of Abraham Lincoln.|In 2010, the design of the coin was changed - the reverse depicts a shield with 13 vertical stripes, symbolizing the state and national unity.', 'UNITED STATES OF AMERICA', 'steel', 'BU', '1 cent', '1793', '5.1 g', '8$', '3', 4),
(7, '25 cents', 'https://i.postimg.cc/FRzdmLhC/25-cents-1.png', 'https://i.postimg.cc/cLcBLfNd/25-cents-2.png', 'Unique coin depicting a caribou (reindeer). The face value of the coin is equal to a quarter of the Canadian dollar.', 'The obverse depicts Queen Elizabeth II. The caribou (reindeer) is depicted on the reverse.|A modern design (with a deer) has been used since the time of King George VI, when the design of other Canadian coins also changed.|Under previous kings, a different design was used for coins from 5 to 50 cents. On the reverse side was the name of the coin in small letters, framed by maple leaves, with a crown at the top.|Ordinary quarters are minted with a caribou on the back.|In 2004, Memorial Day was released. The reverse shows a poppy flower.', 'CANADA', 'nickel', 'BU', '25 cents', '1966', '5.7 g', '80$', '3', 1),
(8, 'Dim Sum', 'https://i.postimg.cc/0y0V3LW5/Dim-Sum-1.png', 'https://i.postimg.cc/ZR2HpZRH/Dim-Sum-2.png', 'Dim Sum is a 10-cent coin of the United States that has been minted from 1946 to the present. This is a unique coin with the image of a torch, oak and olive branches.', 'The obverse of the coin depicts a portrait of the 32nd President of the United States, Franklin D. Roosevelt, and the reverse depicts a torch, oak and olive branches above the motto &ldquo;E pluribus unum&rdquo; - &ldquo;Out of many.&rdquo;|After the death of Franklin Roosevelt in 1945, it was decided to put his image on a coin to perpetuate his memory. The choice of a coin denomination of 10 cents was due to the fact that in 1938 Roosevelt made a lot of efforts to create the National Fund Fund, which is half joking, and since 1979 it has been officially called the &ldquo;March of ten cents&rdquo;.', 'UNITED STATES OF AMERICA', 'nickel', 'BU', '10 cents', '1946', '4.25 g', '10$', '3', 1),
(9, 'South Vietnamese Dong', 'https://i.postimg.cc/pr92cQPx/South-Vietnamese-Dong-1.png', 'https://i.postimg.cc/0yG94y16/South-Vietnamese-Dong-2.png', 'Currency of the Republic of Vietnam in 1955-1975 Coin with the image of wheat.', 'Currency of the Republic of Vietnam in 1955-1975.|On the front side, we see wheat, and on the back, a unit symbolizing money.|The monetary unit of South Vietnam was originally the Indochinese piastre, issued by the Institute of Emissions of the States of Cambodia, Laos and Vietnam. Banknotes of the graduating institute were issued in three types: Cambodian, Lao and Vietnamese. The inscriptions on the banknotes of all samples were made in four languages: French, Khmer, Lao and Vietnamese. Vietnamese-style banknotes depicted a pattern, as well as the inscription &ldquo;VI&Ecirc;N PH&Aacute;T-H&Agrave;NH&rdquo;. Piastres previously issued by the French Bank of Indochina were also in circulation.', 'the Republic of Vietnam', 'nickel', 'BU', '1 dong', '1955', '5.05 g', '56$', '1', 2),
(10, 'The British Antelope', 'https://i.postimg.cc/Y0gSqNZR/The-British-Antelope-1.png', 'https://i.postimg.cc/T18RSL1D/The-British-Antelope-2.png', 'Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound. It has been produced since 1952.', 'On one side of the coin is the head of King George VI, turned to the left. Also at the top in a semicircle is the inscription GEORGIVS SEXTVS REX.|On the other side of the coin is an Antelope. Around it is the inscription SOUTH AFRICA 1952 SUID AFRICA, dotted with dots. Below is the nominal value.', 'British South Africa', 'gold', 'BU', '1/2 pound', '1952', '6.3 g', '78$', '1', 7),
(11, 'Cron', 'https://i.postimg.cc/KY7J6C0v/Cron-1.png', 'https://i.postimg.cc/2yLvDZCF/Cron-2.png', 'A unique coin depicting a Knorr Viking ship at sea.', 'Coin 1 crown was issued from August 1, 1934 to March 25, 1941, during the first period of Estonia&rsquo;s independence.|On the obverse of the coin in the center is a large state seal, the emblem of Estonia, crowned with an arched text with the inscription &ldquo;Eesti Vabariik&rdquo;, and on the lower edge - the year of issue &ldquo;1934&rdquo;.|The reverse depicts a Viking ship Knarr in the sea, under which appears the inscription 1 crown.|In 2012, a single crown coin.', 'Estonia', 'gold', 'BU', '1/2 pound', '1934', '5.67 g', '79$', '1', 2),
(12, 'Franc', 'https://i.postimg.cc/9QbB1y0r/Franc-1.png', 'https://i.postimg.cc/Fz0ySLwF/Franc-2.png', 'Unique coin with the image of a walking elephant. \'Frank\' of the Belgian Congo.', 'On the reverse of the coin in its central part there is an inscription in French: &quot;2 francs&quot; - 2 francs, framed by a five-pointed star. Along the edge from left to right there is an inscription in French and Dutch in two lines: &ldquo;BANQUE DU CONGO BELGE&rdquo;, &ldquo;BANQUE VAN BELGISCH CONGO&rdquo; - Bank of the Belgian Congo. The edge of the coin is decorated with decorative teeth.|On the reverse of the coin in the central part is a walking elephant. The year of minting is located under it: 1947. The edge is uneven.', 'the Belgian Congo', 'gold', 'BU', '2 francs', '1947', '5.45 g', '68$', '1', 2),
(13, 'Stork', 'https://i.postimg.cc/HWfcDnR3/Stork-1.png', 'https://i.postimg.cc/VNL5BC0s/Stork-2.png', 'Unique coin with the image of a flying stork. French coin at 2 two francs 1997.', 'Two francs by Georges Gynemer - a commemorative coin of two French francs, issued in 1997 in honor of the famous pilot of the First World War, Georges Gynemer, on the occasion of the 80th anniversary of the officer cross of the Legion of Honor and his death: shot down in flight by a German plane.|They are painted by engravers of the workshop of coins and medals under the direction of the general engraver of coins Pierre Rodier 4.|The obverse depicts a portrait of Georges Gainemer in a flight suit and pilot&#39;s glasses, raised to his forehead. The inscription GEORGES GUYNEMER 1894-1917 in a semicircle at the top of the coin. And also the year of release below.|The reverse shows a flying stork. Also below the arc is the inscription LIBERT&Eacute; &Eacute;GALIT&Eacute; FRATERNIT&Eacute;, separated by dots. And the face value at the top of the coin.', 'France', 'steel', 'BU', '2 francs', '1997', '6.57 g', '54$', '1', 2),
(14, 'Gyeonggi', 'https://i.postimg.cc/gkdR5rfR/Gyeonggi-1.png', 'https://i.postimg.cc/y6h3FskN/Gyeonggi-2.png', 'The first Australian coin with a nominal value of 1 dollar was introduced on May 13, 1984 to replace a one-dollar banknote.', 'The portraits of Elizabeth II on the obverse of the 1984, 1985 and 1988 coins were made by Arnold Machin, and on the 1999 coins by Ian Rank-Broadley.|The reverse of the coin depicts five kangaroos symbolizing Australia. The drawing was designed by Stuart Devlin in 1966.|The first Australian $ 1 coin was introduced on May 13, 1984 to replace a one-dollar bill.|This is currently the most common coin denomination in Australia.', 'Australia', 'gold', 'BU', '1 dollar', '1984', '4.76 g', '97$', '1', 1),
(15, 'Bolivian Peso', 'https://i.postimg.cc/Kc1tLdtk/Bolivian-Peso-1.png', 'https://i.postimg.cc/3NGy6QZt/Bolivian-Peso-2.png', 'Boliviano Coin with the image of Bolivia.', 'By 1987, the Bolivian peso had completely depreciated and was replaced by a new boliviano during another monetary reform.|Old banknotes were printed and used as a &quot;bargaining chip.&quot; And in 1988, they began to mint a real coin.|This currency is still in circulation.|At the top of one of the sides of the coin in a semicircle is the inscription REPUBLICADE BOLIVIA. At the bottom of the coin, an arc depicts 10 stars.|Above, on the other side of the coin, the inscription PESO BOLIVIANO is located in an arc. In the middle is an image of face value. At the bottom of the year, framed on both sides by branches.', 'Bolivia', 'steel', 'BU', '1 PESO', '1988', '3.62 g', '54$', '1', 1),
(16, 'Botswana', 'https://i.postimg.cc/VLy0t5Yp/Botswana-1.png', 'https://i.postimg.cc/wMDv2c6P/Botswana-2.png', 'Coin with the image of a bird.', 'Coin of state of Botswana 1976.|Translated from Botswana, its name means &ldquo;let it rain&rdquo;|After gaining independence from the United Kingdom in 1966, Botswana was a member of currency unions.|In 2005, as a result of inflation, the currency fell by 12%, but it still remains one of the &ldquo;strong&rdquo; currencies on the African continent.', 'Botswana', 'steel', 'BU', '1 thebe', '1976', '4.28 g', '62$', '1', 1),
(17, 'Virginia', 'https://i.postimg.cc/R0fpdNk8/Virginia-1.png', 'https://i.postimg.cc/mg1mZPgD/Virginia-2.png', 'Virginia Coin with the image of a seahorse. Coin created during the reign of Elizabeth II.', 'The obverse depicts Her Majesty Queen Elizabeth II. At the top of the coin is the inscription British Virgin Islands Queen Elizabeth II 2014.|The reverse depicts a beautiful seahorse with a tail wrapped around a coral.|The choice of seahorse reflects the marine heritage of the British Virgin Islands. The British Virgin Islands, located in the Caribbean Sea and consisting of more than 60 islands, are known for their coral reefs, which are home to a wide variety of animal species, including seahorses.|Seahorse is the name given to 54 species of marine fish in the genus Hippocampus, which comes from the ancient Greek hippos, which means &ldquo;horse&rdquo;, and Campos - &ldquo;sea monster&rdquo;.', 'British Virgin Islands', 'nickel', 'BU', '5 dollars', '2014', '6.98 g', '108$', '1', 1),
(18, 'Theobroma Cocoa', 'https://i.postimg.cc/KvGXYr6Y/Theobroma-Cocoa-1.png', 'https://i.postimg.cc/gJV5zn4R/Theobroma-Cocoa-2.png', 'Coin with a lion in the center of the shield. Ghana coin, published in 1967.', 'The reverse depicts a runaway lion in the center of a shield divided into four parts, separating the date and the face value. The inscription at the top of the coin is TWENTY|As for the images inside the coat of arms:\\n\nupper left: sword (used by chieftains) and staff (used by a linguist for ceremonial events)\\n\ntop right: OSU castle at sea (Presidential Palace),\nbottom left: cocoa tree (agricultural wealth of Ghana).|The Golden Lion and George intersect in the center (a permanent connection between Ghana and the Commonwealth of Nations).', 'Ghana', 'steel', 'BU', '20 pesewas', '1962', '4.76 g', '54$', '1', 1),
(19, 'Coin of the Weimar Republic', 'https://i.postimg.cc/PxWsF6wm/Coin-of-the-Weimar-Republic-1.png', 'https://i.postimg.cc/x1hwjrGv/Coin-of-the-Weimar-Republic-2.png', 'The Hindenburg Coin with the coat of arms of the Weimar Republic.', 'On the obverse, in the center of the coin, at the top is the coat of arms of the Weimar Republic. In the center below is the coat of arms of the Hindenburg family. This is a shield divided into 4 fields - in the upper left and lower right corners there is a head of a bull.|On the reverse side is a portrait of Paul von Hindenburg (1847&ndash;1934), Field Marshal, President of the Weimar Republic in 1925&ndash;1934 (right). Along the edge of the coin is a semicircle of date: 1847-1927 and the inscription: * * REICHSPRASIDENT * VON * HINDENBURG &bull;. At the bottom left of the portrait is a letter denoting a German mint.', 'the Weimar Republic', 'silver', 'BU', '5 Mark', '1927', '4.76 g', '142$', '1', 1),
(20, 'Scientist', 'https://i.postimg.cc/GtS4Hhm3/Scientist-1.png', 'https://i.postimg.cc/rF0mfTpW/Scientist-2.png', 'Silver Egyptian coin with the image of the god Thoth. Silver Egyptian coin.', 'Face value one pound. It has been produced since 1981.|The coin shows the name of the country and its meaning in Arabic. Also depicted is the Egyptian god Thoth.|On the other side is a travel plate left by a radiant sun gear and splatter.|The Egyptian pound is often shortened as LE or L. E., which means livre &eacute;gyptienne (French for Egyptian pound).', 'Egypt', 'silver', 'BU', '1 pound', '1981', '3.95 g', '112$', '1', 1),
(21, 'Lion sedge', 'https://i.postimg.cc/Zqm1v8gn/Lion-sedge-1.png', 'https://i.postimg.cc/CKwQxFBf/Lion-sedge-2.png', 'Indian coin with the image of a lion Ashoka. Face value 1 one rupee. 1975 edition.', 'It depicts the lion Ashok on his pedestal. It is surrounded by the inscription of the name of the country in two languages, meaning and date, surrounded by stylized stalks of grain.|The rupee (from Sanskrit silver) is an Indian historical silver coin, put into circulation in the 15th century, as well as the monetary unit of a number of countries in South Asia.|After the British conquest of Burma in 1852, the Indian rupee became its currency.|In 1938, Burma became an independent British colony.|A year earlier, the release of the Burmese rupee, which lasted until 1952, began.|In 1952, the Burmese rupee was replaced by a kyat.|The rupee remained the currency of Portuguese possessions in India until 1959, when it was replaced by the escudos of Portuguese India.', 'India', 'steel', 'BU', '1 rupee', '1975', '4.95 g', '76$', '2', 9),
(22, 'Rial', 'https://i.postimg.cc/vmj2L525/Rial-1.png', 'https://i.postimg.cc/sggTkTtp/Rial-2.png', 'Iranian silver coin with the image of a lion. Face value 5000 five thousand dinars (5 five taps). 1928 year.', 'It depicts a bust of Reza Shah, whose head is turned to the right.|On the other side is a lion with a saber in front of the radiant sun. Above it is a crown.|Before the monetary reform of 1932, the currency of Iran was fog. (1 fog = 10 clicks, 1 crane = 1000 dinars.)|Currently, the name &quot;fog&quot; is used to denote the amount of 10 reais.', 'Iran', 'silver', 'BU', '5000 dinars', '1928', '6.12 g', '98$', '2', 16),
(23, 'ISK', 'https://i.postimg.cc/0j9QtKby/ISK-1.png', 'https://i.postimg.cc/50S9F9nd/ISK-2.png', 'Icelandic coin with a picture of a fish. Face value 1 Icelandic krona', 'Initially, the krone consisted of 100 Eire (ISL. EYRIR, MN. CH. ISL. Aurar), but since January 1, 1995 Eire has not been used in monetary circulation.|From January 1, 1999, in accordance with Law No. 36 of April 27, 1998, amounts must be rounded to 50 Eire.|Coin minting in Krona began in 1925.|Initially, all coins had a monogram of King Christian X.|Iceland was declared a Republic in 1944, and in 1946 it began to mint coins without royal symbols.|Icelandic coins were minted by the Royal Mint of Denmark, the Royal Mint of Great Britain and a private mint in Birmingham.', 'Iceland', 'nickel', 'BU', '1 Icelandic krona', '2007', '5.42 g', '78$', '2', 3),
(24, 'Yemen', 'https://i.postimg.cc/nhqqwBLv/Yemen-1.png', 'https://i.postimg.cc/5txQ7rTV/Yemen-2.png', 'An octagonal star with dots is depicted on one side of the coin.', 'On the other side, a sailboat divides bills into English and Arabic.|In 1951, East African shilling was declared the only legal tender in Aden.|In 1959, the Federation of the United Arab Emirates of the South was formed, which was transformed into the Federation of South Arabia in 1962.|Aden joined the Federation in 1963.|In April 1965, the South Arabian Dinar was issued and published by the South Arabian Monetary Authority.|East African shillings were exchanged for dinars until July 1, 1965 at a ratio of 20 shillings = 1 dinar.|Dinar was equated to pound.', 'Yemen', 'nickel', 'BU', '25 fils', '1964', '5.47 g', '69$', '2', 13),
(25, 'Woman', 'https://i.postimg.cc/gJmsK4qX/Woman-1.png', 'https://i.postimg.cc/T2k0rVy1/Woman-2.png', '1 yuan Chinese coin with a picture of a woman. 1986 edition.', 'On one side of the coin is a woman sitting on a stone. Doves fly around her|On the other side is a Chinese weapon with stars.|Today, the term &quot;yuan&quot; usually refers to the main unit of account of the renminbi (renminbi), the currency of the People&rsquo;s Republic of China.|Yuan banknotes start at one yuan and go up to 100 yuan.|The yuan symbol is also used in Chinese to denote the monetary units of Japan (yen) and Korea (won) and is used to convert the currency to the dollar, as well as to some other currencies; for example, the US dollar is called in Chinese meiyuan.', 'China', 'nickel', 'BU', '', '1986', '6.02 g', '48$', '2', 1),
(26, 'Alligator', 'https://i.postimg.cc/5yMXzkwT/Alligator-1.png', 'https://i.postimg.cc/fLYLMj6K/Alligatorv-2.png', 'Chinese coin with the image of an alligator. 5 yuan Chinese coin. 1998 edition.', 'It depicts a Chinese alligator on the banks of the river.|On the other side is a Chinese weapon with stars. It is surrounded by hieroglyphs and a coin release date.', 'China', 'nickel', 'BU', '5 yuan', '1998', '7.24 g', '78$', '2', 1),
(27, 'The Golden Panda', 'https://i.postimg.cc/MpZzh86d/The-Golden-Panda-1.png', 'https://i.postimg.cc/XJ5WwjL7/The-Golden-Panda-2.png', 'Chinese coin with the image of two pandas. 5 yuan Chinese coin. 1993 edition.', 'On one side of the coin are two pandas. At the top of the coin are Chinese characters in an arc.|On the other side is a Chinese weapon with stars, surrounded by hieroglyphs. Below is written the year of release.|Chinese Golden Panda, launched in 1982.|Coins (front side) remain unchanged since 1992|There is also a Silver Panda investment coin series, made in a similar design.', 'China', 'nickel', 'BU', '5 yuan', '1993', '7.24 g', '82$', '2', 2),
(28, 'Costa Rica', 'https://i.postimg.cc/pdK62mLv/Costa-Rica-1.png', 'https://i.postimg.cc/WbKWgGDj/Costa-Rica-2.png', 'Costa - African coin with the image of manatee. Costa Rican coin of 100 columns. It has been produced since 1974.', 'On one side of the coin is a shield with a sailing ship in front of the mountains. Below is the release date of the coin.|On the other side of the coin is a manatee among algae.|The Costa Rican coin is the monetary unit of Costa Rica.|Until 2017, the All-Russian classifier of currencies is the &quot;Costa Rican Colony&quot;.', 'Costa Rica', 'nickel', 'BU', '100 columns', '1974', '5.24 g', '78$', '2', 2),
(29, 'Year of the children', 'https://i.postimg.cc/6QLLTnJ9/Year-of-the-children-1.png', 'https://i.postimg.cc/pV1Q9P7n/Year-of-the-children-2.png', 'Costa is an African coin depicting three chicks in a nest. Costa Rican coin of 100 columns. It has been produced since 1979.', 'On one side of the coin are 3 chicks in a nest, symbolizing the International Year of Children.|On the other side is a shield with a sailing ship in front of the mountains, the shining sun behind the mountains.|In circulation are banknotes: 1000 columns of series A and B (red, polymer), 2000 columns (blue with a shark of Mauro Fernandez on one side and a bull shark on the back), 5000 columns of series A and B (yellow with Alfredo Gonz&aacute;lez Flores) with one side and capuchin monkeys on the back), 10,000 columns (green), 20,000 columns and 50,000 columns.|In the monetary circulation of the country are coins in denominations of 500, 100, 50, 25, 20, 10, 5 and 1 column.', 'Costa Rica', 'nickel', 'BU', '100 columns', '1979', '5.24 g', '72$', '2', 2),
(30, 'Sailboat', 'https://i.postimg.cc/xdb3Qhgb/Sailboat-1.png', 'https://i.postimg.cc/D0fGSMQ6/Sailboat-2.png', 'Portuguese silver coin with the image of a sailing ship. ', 'Portuguese silver coin in 5 five escudos. It has been produced since 1933.|On one side of the coin is a sailing ship floating in the sea.|On the other side of the coin is a shield with smaller shields in front of a stylized globe.', 'Portugal', 'silver', 'BU', 'undefined', '1933', '4.4 g', '134$', '2', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `user` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `type` enum('blog','coin') NOT NULL DEFAULT 'blog',
  `coinid` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `login`, `role`) VALUES
(70, '5a880b12f7d87ea8aa8fae6d3b3a4214b6b168d358b358a4ee708114afd61748657af8d72ef7eab48b104e2aa210e67500e74c68b', 'Admin', 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `salt`) VALUES
(1, 'Admin', '$2b$10$MlXpoSOUW9YcOgK.R3O9p.ysQ/GFSeieEyOaRfSAXbd47J02GvkMa', '$2b$10$MlXpoSOUW9YcOgK.R3O9p.'),
(2, 'Omar', '$2b$10$FaTD4gyLXkBPlIQKoOv1jemfve9EST7JUb8a2p4edgsDvidACZrOe', '$2b$10$FaTD4gyLXkBPlIQKoOv1je');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `coins`
--
ALTER TABLE `coins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
