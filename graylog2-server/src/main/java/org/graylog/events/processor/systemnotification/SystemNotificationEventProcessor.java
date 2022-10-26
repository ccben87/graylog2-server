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
package org.graylog.events.processor.systemnotification;

import com.google.inject.assistedinject.Assisted;
import org.graylog.events.event.Event;
import org.graylog.events.event.EventFactory;
import org.graylog.events.event.EventWithContext;
import org.graylog.events.processor.EventConsumer;
import org.graylog.events.processor.EventDefinition;
import org.graylog.events.processor.EventProcessor;
import org.graylog.events.processor.EventProcessorException;
import org.graylog.events.processor.EventProcessorParameters;
import org.graylog2.plugin.MessageSummary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.util.List;
import java.util.function.Consumer;

public class SystemNotificationEventProcessor implements EventProcessor {
    public interface Factory extends EventProcessor.Factory<SystemNotificationEventProcessor> {
        @Override
        SystemNotificationEventProcessor create(EventDefinition eventDefinition);
    }

    private static final Logger LOG = LoggerFactory.getLogger(SystemNotificationEventProcessor.class);

    private final EventDefinition eventDefinition;
    private final SystemNotificationEventProcessorConfig config;

    @Inject
    public SystemNotificationEventProcessor(@Assisted EventDefinition eventDefinition) {
        this.eventDefinition = eventDefinition;
        this.config = (SystemNotificationEventProcessorConfig) eventDefinition.config();
    }

    @Override
    public void createEvents(EventFactory eventFactory, EventProcessorParameters processorParameters, EventConsumer<List<EventWithContext>> eventsConsumer) throws EventProcessorException {
        LOG.debug("Creating events for config={}", config);
    }

    @Override
    public void sourceMessagesForEvent(Event event, Consumer<List<MessageSummary>> messageConsumer, long limit) throws EventProcessorException {
        LOG.debug("No source message available for {}", event);
    }
}
