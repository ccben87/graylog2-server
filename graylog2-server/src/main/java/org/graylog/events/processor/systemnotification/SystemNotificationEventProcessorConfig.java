package org.graylog.events.processor.systemnotification;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.auto.value.AutoValue;
import com.google.common.graph.MutableGraph;
import org.graylog.events.contentpack.entities.EventProcessorConfigEntity;
import org.graylog.events.processor.EventProcessorConfig;
import org.graylog2.contentpacks.EntityDescriptorIds;
import org.graylog2.contentpacks.model.entities.EntityDescriptor;
import org.graylog2.plugin.rest.ValidationResult;

@AutoValue
@JsonTypeName(SystemNotificationEventProcessorConfig.TYPE_NAME)
@JsonDeserialize(builder = SystemNotificationEventProcessorConfig.Builder.class)
public abstract class SystemNotificationEventProcessorConfig implements EventProcessorConfig {
    public static final String TYPE_NAME = "system-notifications-v1";

    public static Builder builder() {
        return Builder.create();
    }

    public abstract Builder toBuilder();

    @AutoValue.Builder
    public static abstract class Builder implements EventProcessorConfig.Builder<Builder> {
        @JsonCreator
        public static Builder create() {
            return new AutoValue_SystemNotificationEventProcessorConfig.Builder()
                    .type(TYPE_NAME);
        }

        public abstract SystemNotificationEventProcessorConfig build();
    }

    // TODO: Implement
    @Override
    public ValidationResult validate() {
        return new ValidationResult();
    }

    @Override
    public EventProcessorConfigEntity toContentPackEntity(EntityDescriptorIds entityDescriptorIds) {
        // TODO: Don't forget to add the correct Jackson subtype mapping, so that the content pack import is successful:
        //  e.g. registerJacksonSubtype(SigmaEventProcessorConfigEntity.class,
        //                SigmaEventProcessorConfigEntity.TYPE_NAME);
        return null;
    }

    // TODO: Implement.
    @Override
    public void resolveNativeEntity(EntityDescriptor entityDescriptor, MutableGraph<EntityDescriptor> mutableGraph) {
    }
}
