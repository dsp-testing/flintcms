import React from 'react';
import { push } from 'react-router-redux';
import GraphQLClass from '../utils/graphqlClass';
import graphFetcher from '../utils/graphFetcher';
import { newToast, errorToasts } from './uiActions';

export const REQUEST_SECTIONS = 'REQUEST_SECTIONS';
export const RECEIVE_SECTIONS = 'RECEIVE_SECTIONS';
export const NEW_SECTION = 'NEW_SECTION';
export const DELETE_SECTION = 'DELETE_SECTION';
export const UPDATE_SECTION = 'UPDATE_SECTION';

export function newSection(title, template, fields) {
  return (dispatch) => {
    const query = `mutation ($data: SectionsInput!) {
        addSection(data: $data) {
          _id
          template
          title
          slug
          fields
        }
      }`;

    const variables = {
      data: {
        title,
        fields,
        template,
      },
    };

    return graphFetcher(query, variables)
      .then((json) => {
        const { addSection } = json.data.data;
        dispatch({ type: NEW_SECTION, addSection });
        dispatch(push(`/admin/entries/${addSection.slug}`));
      })
      .catch((error) => {
        if (error.response) dispatch(errorToasts(error.response.data.errors));
      });
  };
}

export function updateSection(_id, title, template, fields) {
  return async (dispatch) => {
    const query = `mutation ($_id: ID!, $data: SectionsInput!) {
      updateSection(_id: $_id, data: $data) {
        _id
        template
        title
        slug
        fields
      }
    }`;

    const variables = {
      _id,
      data: {
        title,
        template,
        fields,
      },
    };

    return graphFetcher(query, variables)
      .then((json) => {
        const updatedSection = json.data.data.updateSection;
        dispatch({ type: UPDATE_SECTION, updateSection: updatedSection });
        dispatch(newToast({
          message: <span><b>{updatedSection.title}</b> has been updated!</span>,
          style: 'success',
        }));
      })
      .catch(err => new Error(err));
  };
}

export function deleteSection(_id) {
  return (dispatch) => {
    const query = `mutation ($_id:ID!) {
      removeSection(_id: $_id) {
        _id
      }
    }`;

    const variables = {
      _id,
    };

    return graphFetcher(query, variables)
      .then((json) => {
        const { removeSection } = json.data;
        dispatch({ type: DELETE_SECTION, id: removeSection._id });
        dispatch(push('/admin/settings/sections'));
      })
      .catch((error) => {
        if (error.response) dispatch(errorToasts(error.response.data.errors));
      });
  };
}

export function fetchSectionsIfNeeded() {
  return (dispatch, getState) => {
    const fetcherOptions = {
      name: 'sections',
      request: REQUEST_SECTIONS,
      receive: RECEIVE_SECTIONS,
    };

    const query = `{
      sections {
        _id
        template
        title
        slug
        fields
        dateCreated
      }
    }`;

    const fetcher = new GraphQLClass(fetcherOptions, query);
    return fetcher.beginFetch(dispatch, getState());
  };
}
