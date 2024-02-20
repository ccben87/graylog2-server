/*
 * Copyright (C) 2020 Graylog, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Server Side Public License, version 1,
 * as published by MongoDB, Inc.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Server Side Public License for more details.
 *
 * You should have received a copy of the Server Side Public License
 * along with this program. If not, see
 * <http://www.mongodb.com/licensing/server-side-public-license>.
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'components/bootstrap';
import { DocumentTitle, PageHeader, Spinner } from 'components/common';
import { IndexSetConfigurationForm, IndicesPageNavigation } from 'components/indices';
import DocsHelper from 'util/DocsHelper';
import Routes from 'routing/Routes';
import connect from 'stores/connect';
import { IndexSetsActions, IndexSetsStore } from 'stores/indices/IndexSetsStore';
import type { IndexSet } from 'stores/indices/IndexSetsStore';
import { IndicesConfigurationActions, IndicesConfigurationStore } from 'stores/indices/IndicesConfigurationStore';
import { RetentionStrategyPropType, RotationStrategyPropType } from 'components/indices/Types';
import type { RetentionStrategy, RotationStrategy, RetentionStrategyContext } from 'components/indices/Types';
import { adjustFormat } from 'util/DateTime';
import useHistory from 'routing/useHistory';
import useSendTelemetry from 'logic/telemetry/useSendTelemetry';
import { TELEMETRY_EVENT_TYPE } from 'logic/telemetry/Constants';

type Props = {
  retentionStrategies?: Array<RetentionStrategy> | null | undefined;
  rotationStrategies?: Array<RotationStrategy> | null | undefined;
  retentionStrategiesContext?: RetentionStrategyContext | null | undefined;
};

const IndexSetCreationPage = ({ retentionStrategies, rotationStrategies, retentionStrategiesContext }: Props) => {
  const history = useHistory();
  const sendTelemetry = useSendTelemetry();

  useEffect(() => {
    IndicesConfigurationActions.loadRotationStrategies();
    IndicesConfigurationActions.loadRetentionStrategies();
  }, []);

  const _saveConfiguration = (indexSetItem: IndexSet) => {
    sendTelemetry(TELEMETRY_EVENT_TYPE.INDICES.INDEX_SET_CREATED, {
      app_pathname: 'indexsets',
    });

    const copy = indexSetItem;

    copy.creation_date = adjustFormat(new Date(), 'internal');

    return IndexSetsActions.create(copy).then(() => {
      history.push(Routes.SYSTEM.INDICES.LIST);
    });
  };

  const _isLoading = () => !rotationStrategies || !retentionStrategies;

  if (_isLoading()) {
    return <Spinner />;
  }

  return (
    <DocumentTitle title="Create Index Set">
      <IndicesPageNavigation />
      <div>
        <PageHeader
          title="Create Index Set"
          documentationLink={{
            title: 'Index model documentation',
            path: DocsHelper.PAGES.INDEX_MODEL,
          }}
        >
          <span>
            Create a new index set that will let you configure the retention, sharding, and replication of messages
            coming from one or more streams.
          </span>
        </PageHeader>

        <Row className="content">
          <Col md={12}>
            <IndexSetConfigurationForm
              retentionStrategiesContext={retentionStrategiesContext}
              rotationStrategies={rotationStrategies}
              retentionStrategies={retentionStrategies}
              submitButtonText="Create index set"
              submitLoadingText="Creating index set..."
              create
              cancelLink={Routes.SYSTEM.INDICES.LIST}
              onUpdate={_saveConfiguration}
            />
          </Col>
        </Row>
      </div>
    </DocumentTitle>
  );
};

IndexSetCreationPage.propTypes = {
  retentionStrategies: PropTypes.arrayOf(RetentionStrategyPropType),
  rotationStrategies: PropTypes.arrayOf(RotationStrategyPropType),
  retentionStrategiesContext: PropTypes.shape({
    max_index_retention_period: PropTypes.string,
  }),
};

IndexSetCreationPage.defaultProps = {
  retentionStrategies: undefined,
  rotationStrategies: undefined,
  retentionStrategiesContext: {
    max_index_retention_period: undefined,
  },
};

export default connect(
  IndexSetCreationPage,
  {
    indexSets: IndexSetsStore,
    indicesConfigurations: IndicesConfigurationStore,
  },
  ({ indexSets, indicesConfigurations }) => ({
    indexSet: indexSets.indexSet,
    rotationStrategies: indicesConfigurations.rotationStrategies,
    retentionStrategies: indicesConfigurations.retentionStrategies,
    retentionStrategiesContext: indicesConfigurations.retentionStrategiesContext,
  }),
);
