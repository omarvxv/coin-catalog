import React from 'react';
import PageHeader from "../styled-components/PageHeader";
import Style from './homepage.module.scss';
import SearchLine from "../styled-components/SearchLine";
import Section from "./Section";
import RecentlyWatched from "../styled-components/RecentlyWatched";

const groups = [
    {id: 1, name: 'Bullion coins', img: 'https://i.postimg.cc/pr92cQPx/South-Vietnamese-Dong-1.png'},
    {id: 2, name: 'Exclusive coins', img: 'https://i.postimg.cc/50S9F9nd/ISK-2.png'},
    {id: 3, name: 'Commemorative coins', img: 'https://i.postimg.cc/bY2cMwQz/Looney-1.png'},
]

export default () => <div className="container">
                        <PageHeader homePage>Homepage</PageHeader>
                        <div className={Style.searchLine}>
                            <SearchLine advanced={false} homePage/>
                            <RecentlyWatched/>
                        </div>
                        <div className={Style.content}>
                            {groups.map(group => <Section {...group} key={group.id}/>)}
                        </div>
                     </div>
