import React from 'react';

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () =>{
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('Should render three <NavigationItems />', () =>{
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });
    it('Should render three <NavigationItems /> elements if isAuthenticated', () =>{
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });
    it('Should render find <NavigationItems /> elements if isAuthenticated', () =>{
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">خروج</NavigationItem>)).toEqual(true)
    });
})